const { summarizeText } = require('../summarize')

async function update(arr) {
    //console.log("The object received was: ", obj)
    const newArr = Object.values(arr)
    const val = newArr.pop()
    newArr.unshift(val)
    const summary = await summarizeText(newArr[4])
    //console.log(summary)
    const splicedArr = await newArr.toSpliced(4, 1, summary)
    //console.log(splicedArr)
    return splicedArr
};

module.exports = {
    update: update
};