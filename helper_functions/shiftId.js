const { summarizeText } = require('../summarize')

async function update(obj) {
    const arr = Object.values(obj)
    const val = arr.pop()
    arr.unshift(val)
    //console.log(arr)
    // const summary = await summarizeText(arr[4])
    // const splicedArr = arr.toSpliced(4, 1, summary)
    return arr
};

module.exports = {
    update: update
};