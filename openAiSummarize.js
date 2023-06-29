const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require('./helper_functions/config');


const textToCheck = `On 21 June 1922, Count Alexander Rostov - recipient of the Order of Saint Andrew, member of the Jockey Club, Master of the Hunt - is escorted out of the Kremlin, across Red Square and through the elegant revolving doors of the Hotel Metropol. Deemed an unrepentant aristocrat by a Bolshevik tribunal, the Count has been sentenced to house arrest indefinitely. But instead of his usual suite, he must now live in an attic room while Russia undergoes decades of tumultuous upheaval. Can a life without luxury be the richest of all?`

function openAiSummarize(text) {

    const prompt = `Please provide a 2 sentence summary of the following text: 
    
    ${text}`;

    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY
    });

    const openai = new OpenAIApi(configuration);


    openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        })
        .then((res) => {
            console.log(res.data.choices[0].message.content)
        })
        .catch((err) => {
            console.error(err)
        });
};


//openAiSummarize(textToCheck);

module.exports = {
    textToCheck: textToCheck
};