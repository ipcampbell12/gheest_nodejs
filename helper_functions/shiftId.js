const { summarizeText } = require('../summarize')

async function update(arr) {
    //console.log("The object received was: ", obj)
    const newArr = Object.values(arr)
    const val = newArr.pop()
    newArr.unshift(val)
    const summary = await summarizeText(newArr[1])
    //console.log(summary)
    const arrWithSum = newArr.append(summary)
    console.log(arrWithSum)
    //return arrWithSum
};

module.exports = {
    update: update
};