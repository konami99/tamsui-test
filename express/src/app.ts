import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand"
import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import createServer from "./utils/server";
import faktory, { JobFunction } from "faktory-worker";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = parseInt(process.env.PORT as string);
const app = createServer();


app.listen(port, async () => {
  await connect();
});
