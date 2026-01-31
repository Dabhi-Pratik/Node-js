
//common Module 
// const {add , sub} = require("./export");

// const result = add(10,20)


// console.log("Addition1: ",result)
// console.log("Addition2: ",add(20,20))

// console.log("Subtraction1: ",sub(50,20))
// console.log("Subtraction2: ",sub(25,7))

//ES Module

import {add , sub} from "./export.js"

console.log("Addition:",add(10,80))
console.log("Subtraction:",sub(25,14))

// Import default export

import multi from "./export.js"

console.log("Multiplication:",multi(4,5))