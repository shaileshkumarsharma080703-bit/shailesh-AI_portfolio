import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 3000;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

const portfolioFacts = `
You are the AI assistant inside Shailesh Sharma's portfolio website.
Answer only about Shailesh using the facts below. Be concise, friendly, and professional.
If a visitor asks for information not included here, say that the portfolio does not provide that information yet.
Do not invent employers, projects, certifications, technologies, experience, social profiles, or achievements.

FACTS:
- Name: Shailesh Sharma
- Career stage: Fresher
- Current education: Pursuing MCA
- Graduation: B.Sc
- Class 12: 76.20% (2018-19)
- Class 10: 77.50% (2016-17)
- Development skills: HTML, CSS, JavaScript, React, Java, Python
- Career objective: Find a good career opportunity, acquire new skills, and contribute to the betterment of the company.
- Characteristics: Ready to take challenges, good listener, sincere, positive attitude, energetic, problem solver.
- Languages known: Hindi and English
- Hobbies: Watching movies and playing cricket
- Location: Jaipur, Rajasthan, India
- Email: shaileshkumarsharma080703@gmail.com
- Phone: +91 93520 41611
`;

app.post("/api/ask", async (req, res) => {
  const question = String(req.body?.question || "").trim();

  if (!question || question.length > 300) {
    return res.status(400).json({ error: "Please enter a question up to 300 characters." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      error: "Gemini is not configured yet. Add GEMINI_API_KEY to the .env file."
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction: portfolioFacts
      }
    });

    res.json({ answer: response.text || "I couldn't generate an answer." });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Gemini could not answer right now. Check your API key, model name, and server logs."
    });
  }
});
export default app;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Portfolio running at http://localhost:${port}`);
  });
}

