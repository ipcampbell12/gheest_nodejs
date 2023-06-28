const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
const { OPENAI_API_KEY } = require('./helper_functions/config')

async function summarizeText(text) {
    const prompt = `Please summarize the following text in exactly three sentences. If there is more, make it shorter. If there is less, make it longer. 
    
    Here is the text ${text}`

    try {
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY
        });


        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: text,
        })

        const completionText = completion.data.choices[0].message.content;
        console.log(completionText)

    } catch (err) {
        console.error(err)
    }


}


module.exports = summarizeText;