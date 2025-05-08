const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getBotReply(userInput) {
  const messages = [
    {
      role: "user",
      content: `ඔබ Sinhala සහ English දෙකෙන්ම පිළිතුරු දෙන්න. User says: ${userInput}`,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  return response.choices[0].message.content;
}

module.exports = { getBotReply };
