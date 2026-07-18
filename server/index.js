const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
        Return ONLY valid JSON.
        
        {
          "summary":"string",
          "flashcards":[
            {
              "question":"string",
              "answer":"string"
            }
          ],
          "quiz":[
            {
              "question":"string",
              "options":[
                "option1",
                "option2",
                "option3",
                "option4"
              ],
              "correctAnswer":"string"
            }
          ]
        }
        `
        },
        {
          role: "user",
          content: `Generate study material for ${topic}`,
        },
      ],
      temperature: 0.3,
    });

    const text =
      completion.choices[0].message.content;

    const jsonStart = text.indexOf("{");
    const jsonEnd =
      text.lastIndexOf("}") + 1;

    const jsonString = text.substring(
      jsonStart,
      jsonEnd
    );

    const data = JSON.parse(jsonString);

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate content",
    });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
