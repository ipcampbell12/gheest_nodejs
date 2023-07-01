const { summarizeText } = require('../summarize')

async function update(obj) {
    const arr = Object.values(obj)
    const val = arr.pop()
    arr.unshift(val)
    const now = new Date().toLocaleString();
    arr.push(now)
    // const summary = await summarizeText(arr[1])
    // arr.append(summary)
    // const splicedArr = arr.toSpliced(4, 1, summary)
    return arr
};

module.exports = {
    update: update
};