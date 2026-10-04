import "dotenv/config";

import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

console.log(
    "GEMINI KEY:",
    process.env.GEMINI_API_KEY ? "LOADED ✅" : "MISSING ❌"
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio Backend is running 🚀");
});

app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});