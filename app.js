/* Use destructuring to import specific functions only */
// const {add, subtract} = require('../NodeJS_Repo/Notes/ImportExport/commonJs/calc_CommonJsWay');

/* Import everything, this is future proof in case of any modifcations */
const calcObj = require('../NodeJS_Repo/Notes/ImportExport/commonJs/calc_CommonJsWay');

/* To import node's inbuilt libraries */
// const fs = require('fs');

console.log('2 + 3 => ' + calcObj.add(2, 3));
console.log('3 - 1 => ' + calcObj.subtract(3, 1));