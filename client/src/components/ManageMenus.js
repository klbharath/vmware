import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import DateField from "./common/DateField";
import Menus from "./Menus";
import { useDispatch } from "react-redux";
import { postMenu } from "../actions/menuActions";

const ManageMenus = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  const [dateVal, setDateVal] = useState(null);
  const dateRef = useRef(null);

  const setInputValues = (e) => {
    if (!e?.target) return;
    setFormValues({
      ...formValues,
      [e.target?.name]: e.target?.value,
    });
  };

  const setInputDate = (date, contex) => {
    setDateVal(date);
    setFormValues({
      ...formValues,
      date: new Date(date)?.getTime(),
    });
  };

  const handleSubmit = () => {
    if (!Object.keys(formValues)?.length) {
      return;
    }

    if (!formValues.name || !formValues.date) {
      return;
    }

    dispatch(postMenu(formValues));
    setFormValues({});
    setDateVal(null);
    setTimeout(() => (dateRef.current.value = ""), 1000);
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "24px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Menu
        </Typography>
        <TextField
          id="outlined-basic"
          label="Food"
          name="name"
          value={formValues.name || ""}
          variant="outlined"
          onChange={(e) => setInputValues(e)}
        />
        <DateField
          name="date"
          inputRef={dateRef}
          onChange={setInputDate}
          defaultValue=""
          value={dateVal}
        />
        <Button
          style={{ height: "55px" }}
          variant="outlined"
          onClick={() => handleSubmit()}
        >
          Add
        </Button>
      </Box>
      <Menus allowEdit manageMenu />
    </React.Fragment>
  );
};
export default ManageMenus;
