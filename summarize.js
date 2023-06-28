const cohere = require("cohere-ai");
const readlineSync = require("readline-sync");
const { COHERE_API_KEY } = require('./helper_functions/config')

async function summarizeText(text) {

    cohere.init(COHERE_API_KEY)


    const messages = [];

    const response = await cohere.generate({
        modle: "large",
        prompt: text,
        max_tokens: 100,
        temperature: 0
    });

    const summary = response.body.generations
    //console.log(summary)
    return summary

}


summarizeText(text)

module.exports = summarizeText;