import { Express, Request, Response } from "express";
import { result } from "lodash";
import { createNoteHandler } from "./controllers/note.controller";
import { createUserSessionHandler } from "./controllers/session.controller";
import { createUserHandler, getUsersHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import { createEmailHandler } from "./controllers/email.controller";

function routes(app: Express) {
  app.post("/emails", createEmailHandler);

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", createUserHandler);

  app.get("/api/users", getUsersHandler);

  app.post(
    "/api/sessions",
    createUserSessionHandler,
  )

  app.post(
    "/api/notes",
    requireUser,
    createNoteHandler,
  )
}

export default routes;