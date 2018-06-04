let a = '1234567890'

console.time('1')
for (let i = 0; i < 9999999; i++) {
    let b = a.substring(0)
}
console.timeEnd('1')//1: 11.637ms

console.time('2')
for (let i = 0; i < 9999999; i++) {
    let b = a.substr(0)
}
console.timeEnd('2')//2: 85.131ms

