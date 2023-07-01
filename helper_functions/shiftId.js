const { summarizeText } = require('../summarize')

async function update(obj) {
    const arr = Object.values(obj)
    const val = arr.pop()
    arr.unshift(val)
    //console.log(arr)
    const now = new Date().toLocaleString();
    arr.push(now)

    // const timeStamp = new Date().getDate();
    // arr.append(timeStamp);
    // console.log(arr)
    //console.log(arr)
    // const summary = await summarizeText(arr[1])
    // arr.append(summary)
    // const splicedArr = arr.toSpliced(4, 1, summary)
    return arr
};

module.exports = {
    update: update
};