const cohere = require("cohere-ai");
const readlineSync = require("readline-sync");
const { COHERE_API_KEY } = require('./helper_functions/config')

const textToCheck = `The year is 1922, and facing of the judgement of the Bolshevik tribunal is Count Alexander Ilyich Rostov. Considered an impenitent aristocrat, Count Rostov is sentenced to a lifetime of house arrest in Hotel Metropol—the luxurious hotel a street across from Kremlin. A man of culture and intellect, Rostov has lived all his life in opulence. Now, he must abandon comfort and riches, and move into the hotel's attic during which the most turbulent period in Russia's history are unfurling right out the streets below. A Gentleman in Moscow is a story rich of wit and humor, effectively presented through an impressive cast of characters and dialogue beautifully woven together. Amor Towles tells the story of a gentleman in Moscow seeking to understand what it truly means to live a life with purpose. Wait no more, take action and get this book now!`

async function summarizeText(text) {
    //console.log(text)
    cohere.init(COHERE_API_KEY)


    const response = await cohere.generate({
        model: "xlarge",
        length: 'medium',
        prompt: text,
        max_tokens: 100,
        temperature: 0.5,
        format: "paragraph"
    });

    const summary = response.body.generations[0].text
    //console.log(summary)
    return summary

}


//summarizeText(textToCheck)

module.exports = {
    summarizeText: summarizeText
}