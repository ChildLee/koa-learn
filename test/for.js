let arr = new Array(10000000)
let arr1 = []
let arr2 = []
let arr3 = []
let arr4 = []
let arr5 = []
let arr6 = []

arr.fill(1)

console.time('for优化版')
for (let i = 0, len = arr.length; i < len; i++) {
    arr1.push(arr[i])
}
console.timeEnd('for优化版')

//for
console.time('for')
for (let i = 0; i < arr.length; i++) {
    arr2.push(arr[i])
}
console.timeEnd('for')

//forEach
console.time('forEach')
arr.forEach(function (val) {
    arr3.push(val)
})
console.timeEnd('forEach')

//for in
console.time('for in')
for (let b in arr) {
    arr4.push(arr[b])
}
console.timeEnd('for in')

//map
console.time('map')
arr.map(function (val) {
    arr5.push(val)
})
console.timeEnd('map')

//for of
console.time('for of')
for (let d of arr) {
    arr6.push(arr[d])
}
console.timeEnd('for of')