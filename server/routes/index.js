import Express from "express";
import Menu from "./Menu.js";

const Router = Express.Router();

const apiContext = "/api/v1/";
Router.use(apiContext, Menu);

export default Router;
