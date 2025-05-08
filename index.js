const express = require("express");
const { MessagingResponse } = require("twilio").twiml;
const { getBotReply } = require("./openaiService");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post("/bot", async (req, res) => {
  const incomingMsg = req.body.Body;
  const twiml = new MessagingResponse();

  try {
    const reply = await getBotReply(incomingMsg);
    twiml.message(reply);
  } catch (error) {
    console.error("Error:", error.message);
    twiml.message("මා ආපහු පිළිතුරු දිය නොහැකිය. කරුණාකර මට පසුව උත්සාහ කරන්න.");
  }

  res.type("text/xml").send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot server running on http://localhost:${PORT}`);
});
