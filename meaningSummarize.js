const axios = require('axios');
const { LICENSE_KEY } = require('./helper_functions/config');
const { textToCheck } = require('./openAiSummarize')

console.log(LICENSE_KEY)
async function summarizeText(text) {
    const formdata = new FormData();
    formdata.append("key", LICENSE_KEY);
    formdata.append("txt", text);
    formdata.append("sentences", 2);


    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };


    const response = await axios("https://api.meaningcloud.com/summarization-1.0", requestOptions)

    console.log(response.data)
}


summarizeText(textToCheck)