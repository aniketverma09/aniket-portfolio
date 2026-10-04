import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        console.log("📩 User message:", message);
        console.log(
            "🔑 Gemini Key:",
            process.env.GEMINI_API_KEY ? "LOADED ✅" : "MISSING ❌"
        );

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            });
        }

        console.log("⏳ Sending request to Gemini...");

        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",

            system_instruction: `
You are the AI assistant for Aniket Verma's developer portfolio.

Known information:
- Name: Aniket Verma
- Role: Web Developer
- Technologies: HTML, CSS, JavaScript, React, Node.js
- Projects: Pixels Photography Website and Verma Restaurant.

Rules:
- Answer in a friendly and professional way.
- Keep answers concise.
- Answer questions about Aniket's portfolio and projects.
- Do not invent information about Aniket.
- If information is unavailable, clearly say so.
`,

            input: message
        });

        console.log("✅ Gemini response received");

        const reply = interaction.output_text;

        console.log("🤖 Reply:", reply);

        return res.status(200).json({
            success: true,
            reply: reply
        });

    } catch (error) {
        console.error("❌ GEMINI ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Gemini AI is temporarily unavailable."
        });
    }
};