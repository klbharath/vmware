import * as React from "react";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Button, Box, Dialog, DialogTitle } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectMenus, selectStateMenu } from "../selectors";
import { putMenu } from "../actions/menuActions";

/*
    docs - for data grid
    https://mui.com/x/react-data-grid/editing/#stop-editing
    https://mui.com/x/api/data-grid/data-grid/
*/

function computeMutation(newRow, oldRow) {
  if (newRow.name !== oldRow.name) {
    return `Food changed from '${oldRow?.name}' to '${newRow?.name}'`;
  }
  return null;
}

const MenuTable = (props) => {
  const { allowEdit } = props;
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const dispatch = useDispatch();
  const noButtonRef = React.useRef(null);

  const columns = [
    {
      field: "name",
      headerName: "Menu",
      width: 500,
      editable: allowEdit,
    },
    { field: "date", headerName: "Date", width: 500 },
  ];

  const menuState = useSelector(
    (state) => selectStateMenu(state),
    shallowEqual
  );
  const m_Menus = useSelector((state) => selectMenus(state), shallowEqual); // modified version of menu JSON

  if (!m_Menus.length) {
    <h3>Menus not available. Click on manage to add items</h3>;
  }

  const checkCellEditable = (e) => {
    return e?.field === "name";
  };

  // handle no
  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  // handle yes
  const handleYes = () => {
    const { newRow, oldRow, resolve, reject } = promiseArguments;
    try {
      if (newRow?.name === oldRow?.name) {
        return;
      }
      if (!newRow?.name) {
        return;
      }
      dispatch(putMenu(newRow?.id, { name: newRow?.name }, menuState));
      resolve(newRow);
      setPromiseArguments(null);
    } catch (e) {
      reject(oldRow);
    }
  };

  // when row update done, method will be called
  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow);
        }
      }),
    []
  );

  // handle dialog box
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        // TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent
          dividers
        >{`Pressing 'Yes' will change from ${mutation}`}</DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          paddingBottom: "16px",
          textAlign: "left",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {`Available Items - ${m_Menus.length}`}
        </Typography>
        {allowEdit && (
          <i style={{ color: "grey" }}>
            Note - Click on menu cell to edit the food
          </i>
        )}
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        {renderConfirmDialog()}
        <DataGrid
          rows={m_Menus}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          disableColumnFilter
          editMode="cell"
          isCellEditable={checkCellEditable}
          processRowUpdate={processRowUpdate}
          onCellEditStop={(params, event) => {
            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default MenuTable;