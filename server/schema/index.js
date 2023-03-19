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

MenuSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

MenuSchema.set("toJSON", {
  virtuals: true,
});

export const MenuModel = Mongoose.model("menu", MenuSchema);
