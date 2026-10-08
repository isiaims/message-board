import { Router } from "express";
import getNewMessage from "../controllers/newMessageController.js";
import messages from "../db/messages.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

indexRouter.post("/new", getNewMessage);

export default indexRouter;
