const { summarizeText } = require('../summarize')

function update(obj) {
    const arr = Object.values(obj)
    const val = arr.pop()
    arr.unshift(val)
    const summary = summarizeText(arr[4])
    const newArr = arr.toSpliced(4, 1, summary)
    return newArr
};

module.exports = {
    update: update
};