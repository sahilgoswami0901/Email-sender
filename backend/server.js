const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace this with your actual Groq API key
const GROQ_API_KEY = "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";  // <-- your API key here

app.post("/api/generate-email", async (req, res) => {
  const { recipient, prompt } = req.body;

  const userPrompt = `Write a professional email to ${recipient} about: ${prompt}`;
  console.log("Request received with prompt: ", userPrompt)

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are an expert email writer." },
          { role: "user", content: userPrompt }
        ]
      })
    });

    const data = await response.json();
    console.log("Groq response: ", data)

    if (data.choices && data.choices.length > 0) {
      const email = data.choices[0].message.content;
      res.json({ email });
    } else {
      res.status(500).json({ error: "No valid response from Groq API" });
    }
  } catch (err) {
    console.error("Groq API Error:", err);
    res.status(500).json({ error: "Email generation failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});