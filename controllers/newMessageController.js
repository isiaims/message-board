import { getMessages, insertMessagesPost } from "../db/queries.js";
import { body, matchedData, validationResult } from "express-validator";

const validateMessenger = [
  body("user")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 10 })
    .withMessage("Name must be between 1 and 10 characters")
    .escape(),
  body("message")
    .trim()
    .notEmpty()
    .isLength({ max: 250 })
    .withMessage("Message cannot exceed 250 characters")
    .escape(),
];

const getNewMessage = [
  validateMessenger,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = await getMessages();
      res.status(400).render("index", {
        title: "Mini Messageboard",
        messages,
        errors: errors.array(),
      });
      return;
    }
    const { message: text, user } = matchedData(req);
    const added = new Date();

    const newMessage = { text, user, added };
    await insertMessagesPost(newMessage);
    res.redirect("/");
  },
];

export default getNewMessage;
