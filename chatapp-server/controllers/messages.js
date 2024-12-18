const Message = require("../models/message");

const getChat = async (req, resp) => {
  const myId = req.uid;
  const messagesFrom = req.params.from;

  const last30Messages = await Message.find({
    $or: [
      { from: myId, to: messagesFrom },
      { from: messagesFrom, to: myId },
    ],
  })
    .sort({ createdAt: "asc" })
    .limit(30);

  resp.json({
    ok: true,
    messages: last30Messages,
  });
};

module.exports = {
  getChat,
};
