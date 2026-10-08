import messages from "../db/messages.js";

export default async function getNewMessage(req, res) {
  const text = req.body.message;
  const user = req.body.user;
  const added = new Date();

  const newMessage = { user, text, added };
  messages.push(newMessage);
  res.redirect("/");
}
