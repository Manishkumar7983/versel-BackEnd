require('dotenv').config()
const app = require('./src/app')

// Check if required environment variables are set
if (!process.env.GOOGLE_GEMINI_KEY) {
    console.warn('⚠️  WARNING: GOOGLE_GEMINI_KEY environment variable is not set!')
    console.warn('   The AI code review functionality will not work without this key.')
    console.warn('   Please create a .env file with your Google Gemini API key.')
    console.warn('   Get your API key from: https://makersuite.google.com/app/apikey')
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
    if (!process.env.GOOGLE_GEMINI_KEY) {
        console.log('⚠️  AI features are disabled due to missing API key')
    } else {
        console.log('✅ AI code review features are enabled')
    }
})