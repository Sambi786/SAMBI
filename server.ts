import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Free local API endpoint for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, project } = req.body;
      
      if (!name || !email || !project) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log(`[New Contact Request] Name: ${name}, Email: ${email}, Project: ${project}`);
      
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      res.json({ success: true, message: "Request received." });
    } catch (error: any) {
      console.error("Contact API Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      const contents = messages.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.1-pro-preview",
        contents,
        config: {
          systemInstruction:
            "You are SAMBI, a Smart Assistant Made By (SMNB) Intelligence. You assist users with creating applications, learning standard AI usage, managing daily tasks, and providing insights. Be concise, highly intelligent, and adhere to strict privacy guidelines.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        },
      });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For Express 4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
