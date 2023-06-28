
function shiftId(arr) {
    const val = arr.pop()
    arr.unshift(val)
    return arr
};

module.exports = {
    shiftId: shiftId
};