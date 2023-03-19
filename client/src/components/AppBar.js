import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import Menus from "./Menus";
import ManageMenus from "./ManageMenus";
import { shallowEqual, useSelector } from "react-redux";
import Loader from "./common/loader";

const DefaultPath = {
  "/": 0,
  "/manage": 1,
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const BasicTabs = () => {
  const location = useLocation();
  const state = useSelector((state) => state?.menus, shallowEqual);
  const { loading } = state;
  const [value, setValue] = React.useState(
    DefaultPath[location?.pathname] || 0
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      {loading && <Loader />}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Menu" id="simple-tabpanel-0" />
            <Tab label="Manage Menu" id="simple-tabpanel-1" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Menus />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManageMenus />
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default BasicTabs;
