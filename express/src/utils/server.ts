import express from "express";
import routes from "../routes";
import cors from "cors";
import deserializeUser from "../middleware/deserializeUser";

export default function createServer() {
  const app = express();
  app.use(express.json());
  app.use(deserializeUser);
  app.use(cors({
    origin: process.env.TAMSUI_HOST
  }));
  routes(app);
  return app;
}