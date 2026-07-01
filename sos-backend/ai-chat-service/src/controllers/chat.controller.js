import chatService from "../services/chat.service.js";

export const askQuestion = async (req, res, next) => {
    try {
        const { query } = req.body;

        if (!query || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: "Query is required.",
            });
        }

        const response = await chatService.askQuestion(query);

        return res.status(200).json({
            success: true,
            data: response,
        });

    } catch (error) {
        next(error);
    }
};