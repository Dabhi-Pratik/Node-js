//common module js
//Core modules are built-in Node.js modules used to perform common tasks without installation.
//No need to install them using npm.
//Import → require()
//Export → module.exports or exports

const fs = require("fs")

fs.writeFileSync("new.text","New text file created..")

const data = fs.readFileSync("new.text","utf-8")

console.log("Data: ",data)