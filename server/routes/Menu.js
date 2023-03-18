import Express from "express";
import Mongoose from "mongoose";
import { MenuModel } from "../schema/index.js";

const Router = Express.Router();

// get list of menu
Router.get("/menu", (req, res) => {
  MenuModel.find()
    .sort({ date: -1 })
    .then((menus) => res.status(200).json({ success: true, menus }))
    .catch((err) => {
      console.error(`Exception in fetching Menus GET- ${err}`);
      res
        .status(500)
        .json({ success: false, message: `Error in fetching menus.` });
    });
});

// create Menu
Router.post("/menu", async (req, res) => {
  const { name, date } = req?.body;

  // check if menu already exists for date. if available throw error
  const Menu = await MenuModel.find({ name, date }).exec();
  if (Menu.length) {
    console.error(`Food truck already exists for the date. ${name}`);
    return res.status(500).json({
      success: false,
      message: `Food truck already exists for the date.`,
    });
  }

  const newMenu = new MenuModel({
    name,
    date,
  });

  newMenu
    .save()
    .then((menu) => res.status(201).json({ success: true, menu }))
    .catch((err) => {
      console.error(`Exception in fetching Menus POST- ${err}.`);
      res
        .status(500)
        .json({ success: false, message: `Error in inserting menu.` });
    });
});

// edit menu
Router.put("/menu/:id", async (req, res) => {
  const { id } = req?.params;
  const { name } = req?.body;

  // check ID is of valid type
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Food truck does not exists for the date. ${id}`);
    return res.status(500).json({
      success: false,
      message: `Food truck does not exists for the date.`,
    });
  }

  // check if menu already existis, if not throw error
  const Menu = await MenuModel.findById(id).exec();
  if (!Menu) {
    console.error(`Food truck does not exists for the date. ${id}`);
    return res.status(500).json({
      success: false,
      message: `Food truck does not exists for the date.`,
    });
  }

  Menu.name = name;
  Menu.save()
    .then((menu) => res.status(200).json({ success: true, menu }))
    .catch((err) => {
      console.error(`Exception in fetching Menus PUT- ${err}.`);
      res
        .status(500)
        .json({ success: false, message: `Error in updating menu.` });
    });
});

export default Router;
