const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Code is required"
            });
        }

        // Check if AI service is available
        if (!process.env.GOOGLE_GEMINI_KEY) {
            return res.status(503).json({
                success: false,
                message: "AI service is currently unavailable. Please contact administrator to set up Google Gemini API key.",
                error: "GOOGLE_GEMINI_KEY not configured"
            });
        }

        const response = await aiService(code);
        
        // Check if the response contains an error
        if (response.error) {
            return res.status(503).json({
                success: false,
                message: response.message,
                error: "AI_SERVICE_UNAVAILABLE"
            });
        }
        
        res.json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Error in AI controller:', error);
        res.status(500).json({
            success: false,
            message: 'AI service error',
            error: error.message
        });
    }
}