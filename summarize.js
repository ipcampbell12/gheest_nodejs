const cohere = require("cohere-ai");
const { textToCheck } = require('./openAiSummarize')
const { COHERE_API_KEY } = require('./helper_functions/config');


const bookTitle = 'To Kill a Mockingbird'

async function summarizeText(text) {

    cohere.init(COHERE_API_KEY)


    const response = await cohere.generate({
        model: "xlarge",
        length: "medium",
        prompt: text,
        max_tokens: 100,
        temperature: 0.5,
        format: "paragraph"

    });

    const summary = response.body.generations[0]['text']
    //console.log(summary)
    return summary

}


//summarizeText(bookTitle)

module.exports = {
    summarizeText: summarizeText
};