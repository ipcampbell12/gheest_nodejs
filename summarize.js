const cohere = require("cohere-ai");
const readlineSync = require("readline-sync");
const { COHERE_API_KEY } = require('./helper_functions/config')

async function summarizeText(text) {

    cohere.init(COHERE_API_KEY)


    const messages = [];

    const response = await cohere.generate({
        model: "xlarge",
        length: "small",
        prompt: text,
        max_tokens: 100,
        temperature: 0.5,
        format: "paragraph"

    });

    const summary = response.body.generations[0]['text']
    //console.log(summary)
    return summary

}


//summarizeText(text)

module.exports = {
    summarizeText: summarizeText
};