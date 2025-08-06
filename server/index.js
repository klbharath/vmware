import Express from "express";
import Mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import BodyParser from "body-parser";
import Routes from "./routes/index.js";

const App = Express();
const port = process.env.PORT || 5000;

// mongo in-memory database
// dummy commit to test git hooks
const mongoDb = await MongoMemoryServer.create();
const uri = mongoDb.getUri();
Mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

App.use(BodyParser.json()); // body parser
App.use(Routes); // Routes
App.use((req, res) => {
  // path not found
  const { path } = req;
  console.error(`Path not found! - ${path}`);
  res.status(404).send(`Path not found! - ${path}`);
});

App.listen(port, () => console.info(`Server started at ${port}...`));

// safely exit app
process.on("SIGTERM", async (signal) => {
  if (!signal) return;
  await mongoDb.stop();
  process.kill(process.pid, "SIGINT");
  process.exit(1);
});

process.on("SIGINT", async (signal) => {
  if (!signal) return;
  await mongoDb.stop();
  process.kill(process.pid, "SIGINT");
  process.exit(1);
});
