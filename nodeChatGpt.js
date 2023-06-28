const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
const { OPENAI_API_KEY } = require('./helper_functions/config')

async function summarizeText(text) {
    const prompt = `Please summarize the following text in exactly three sentences. If there is more, make it shorter. If there is less, make it longer. 
    
    Here is the text ${text}`

    const messages = [];

    try {
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY
        });


        const openai = new OpenAIApi(configuration);

        messages.push({ role: "user", content: prompt })

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        })

        const completionText = completion.data.choices[0].message.content;
        console.log(completionText)

    } catch (err) {
        console.error(err)
    }


}

const text = `
The mega-bestseller with more than 2 million readers, soon to be a Showtime/Paramount series starring Ewan McGregor as Count Alexander Rostov From the #1 New York Times-bestselling author of The Lincoln Highway and Rules of Civility, a beautifully transporting novel about a man who is ordered to spend the rest of his life inside a luxury hotel In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal, and is sentenced to house arrest in the Metropol, a grand hotel across the street from the Kremlin. Rostov, an indomitable man of erudition and wit, has never worked a day in his life, and must now live in an attic room while some of the most tumultuous decades in Russian history are unfolding outside the hotel’s doors. Unexpectedly, his reduced circumstances provide him entry into a much larger world of emotional discovery. Brimming with humor, a glittering cast of characters, and one beautifully rendered scene after another, this singular novel casts a spell as it relates the count’s endeavor to gain a deeper understanding of what it means to be a man of purpose.
`


summarizeText(text)

module.exports = summarizeText;