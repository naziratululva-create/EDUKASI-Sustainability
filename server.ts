import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Get Eco-friendly Alternatives
app.post("/api/alternatives", async (req: Request, res: Response) => {
  try {
    const { item } = req.body;
    if (!item || typeof item !== "string") {
      res.status(400).json({ error: "Item name is required and must be a string." });
      return;
    }

    const ai = getAI();
    const prompt = `Provide 2 practical, durable, eco-friendly, and zero-waste alternatives for: "${item}". Write the explanation in Indonesian. Include plastic/waste impact, transition tips, and a DIY option if applicable.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert in sustainability and zero waste lifestyles. Your response must be highly practical, engaging, and structured as JSON matching the requested schema. Use friendly Indonesian language.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["originalItem", "alternatives", "diyOption", "overallImpact"],
          properties: {
            originalItem: { type: Type.STRING },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "whyBetter", "difficulty", "tips"],
                properties: {
                  name: { type: Type.STRING, description: "Name of the zero-waste alternative product" },
                  whyBetter: { type: Type.STRING, description: "Detailed explanation of why it is better for the environment" },
                  difficulty: { type: Type.STRING, description: "Transition difficulty level (e.g., Sangat Mudah, Mudah, Sedang, Menantang)" },
                  tips: { type: Type.STRING, description: "Practical tip to start using or switching to this alternative" },
                },
              },
            },
            diyOption: {
              type: Type.OBJECT,
              required: ["title", "instructions"],
              properties: {
                title: { type: Type.STRING, description: "An easy DIY alternative project title" },
                instructions: { type: Type.STRING, description: "Step-by-step DIY instructions in Indonesian" },
              },
            },
            overallImpact: {
              type: Type.STRING,
              description: "Brief motivating summary of plastic or waste avoided by making this shift",
            },
          },
        },
      },
    });

    const jsonText = response.text || "{}";
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("Error generating alternatives:", error);
    res.status(500).json({
      error: error.message || "Gagal mendapatkan alternatif ramah lingkungan. Silakan coba lagi.",
    });
  }
});

// 2. API: Generate Action Plan
app.post("/api/action-plan", async (req: Request, res: Response) => {
  try {
    const { level, focusAreas } = req.body;
    const difficultyLevel = level || "beginner";
    const areas = focusAreas && Array.isArray(focusAreas) && focusAreas.length > 0 ? focusAreas.join(", ") : "Dapur, Kamar Mandi, Belanja";

    const ai = getAI();
    const prompt = `Buatkan program rencana aksi hidup minim sampah (zero waste 7-day challenge) selama 7 hari dalam bahasa Indonesia untuk tingkat kesulitan: "${difficultyLevel}" dan area fokus: "${areas}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional zero-waste lifestyle coach. Create a customized, highly motivational 7-day challenge in Indonesian. Each day must contain concrete, realistic actions. The format must match the requested JSON schema exactly.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "summary", "days"],
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["dayNumber", "dayTitle", "challenge", "whyItMatters", "plasticSavedEst"],
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  dayTitle: { type: Type.STRING, description: "Focus or title of the day's challenge" },
                  challenge: { type: Type.STRING, description: "Specific action item for the user to complete" },
                  whyItMatters: { type: Type.STRING, description: "The environmental reason why this action is crucial" },
                  plasticSavedEst: { type: Type.STRING, description: "Estimated waste or plastic units saved (e.g. '3 kantong plastik', '1 botol plastik')" },
                },
              },
            },
          },
        },
      },
    });

    const jsonText = response.text || "{}";
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("Error generating action plan:", error);
    res.status(500).json({
      error: error.message || "Gagal membuat rencana aksi. Silakan coba lagi.",
    });
  }
});

// Serve frontend assets
async function setupFrontend() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupFrontend().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
