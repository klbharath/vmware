import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { getMenus, toggleToast } from "../actions/menuActions";
import MenuTable from "./MenuTable";

const Menus = (props) => {
  const dispatch = useDispatch();
  const { allowEdit, manageMenu } = props;
  const menuState = useSelector((state) => state?.menus, shallowEqual);
  const { menus, errorMsg, toast, loaded } = menuState;
  useEffect(() => {
    if (!menus.length && !loaded) {
      dispatch(getMenus());
    }
  }, [dispatch, menus]);

  const handleClose = (event, reason) => {
    dispatch(toggleToast());
  };

  return (
    <React.Fragment>
      {errorMsg && (
        <Alert style={{ marginBottom: "16px" }} severity="error">
          {errorMsg}
        </Alert>
      )}
      <Snackbar open={toast} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Food added successfully
        </Alert>
      </Snackbar>
      <MenuTable allowEdit={allowEdit} manageMenu={manageMenu} />
    </React.Fragment>
  );
};

export default Menus;
