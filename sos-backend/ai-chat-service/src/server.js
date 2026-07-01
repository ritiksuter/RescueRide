import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 8007;

app.listen(PORT, () => {
    console.log(`🚀 AI Chat Service running on port ${PORT}`);
});