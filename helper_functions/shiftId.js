const { summarizeText } = require('../summarize')

<<<<<<< HEAD
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
=======
function update(obj) {
    const arr = Object.values(obj)
    const val = arr.pop()
    arr.unshift(val)
    const summary = summarizeText(arr[4])
    const newArr = arr.toSpliced(4, 1, summary)
    return newArr
>>>>>>> parent of a5583b9 (before summarizing title)
};

module.exports = {
    update: update
};