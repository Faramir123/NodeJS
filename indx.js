//ДЗ УРОК 1 НОД JS

var colors = require('colors')

const numbers = process.argv.slice(2)
const massivNum = Object.values(numbers).map(el => +el)
let newArr=[]

if(massivNum.length !== 2 || isNaN(massivNum[0]) || isNaN(massivNum[1])){
console.log('Введено не корректное значение! Задайте диапазон чисел ОТ 0 ДО 100!')
} else {
    for ( let i = massivNum[0]; i<= massivNum[1]; i++){
        let flag = 1
        for( let j = 2; j <= i/2; j++){
            if(i % j == 0 ){
                flag = 0
            }
        }
        if (i>=2){
            if(flag ==1){
                newArr=[...newArr, i]
            }
        }
    }
}

let a = 0
let b = 1
let c = 2

newArr.forEach((elem, ind) =>{
    if(ind == a){
        a +=3
        console.log(colors.green(elem))
    } 
    if(ind == b){
        b += 3
        console.log(colors.yellow(elem))
    } 
    if(ind == c) {
        c+=3
        console.log(colors.red(elem))
    }
})
