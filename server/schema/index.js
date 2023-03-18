import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

export const MenuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const MenuModel = Mongoose.model("menu", MenuSchema);
