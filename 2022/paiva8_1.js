"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync('inputs\\tehtava8_input.txt', 'utf8');
var lines = data.split(/\r?\n/);
function writeCopy(line) {
    fs.appendFile('day7_visualizer.txt', '\n' + line, function (err) {
        if (err) {
            console.log(err);
        }
    });
}
var sum = 0;
// build matrix from data
var forestMatrix = [];
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var row = [];
    for (var i = 0; i < line.length; i++) {
        row.push(parseInt(line[i]));
    }
    forestMatrix.push(row);
}
var forestCopy = JSON.parse(JSON.stringify(forestMatrix));
for (var i = 0; i < forestMatrix.length; i++) {
    var _loop_1 = function (j) {
        var row = forestMatrix[i];
        var column = forestMatrix.map(function (row) { return row[j]; });
        var top_1 = column.slice(0, i + 1);
        var bottom = column.slice(i, column.length);
        var leftSide = row.slice(0, j + 1);
        var rightSide = row.slice(j, row.length);
        if (rightSide.filter(function (value) { return value >= rightSide[0]; }).length == 1) {
            console.log("i: ".concat(i, " j: ").concat(j));
            console.log(rightSide);
            console.log(rightSide[0]);
            forestCopy[i][j] = 'A';
            sum += 1;
        }
        else if (leftSide.filter(function (value) { return value >= leftSide.slice(-1)[0]; }).length == 1) {
            sum += 1;
            forestCopy[i][j] = 'B';
        }
        else if (top_1.filter(function (value) { return value >= top_1.slice(-1)[0]; }).length == 1) {
            sum += 1;
            forestCopy[i][j] = 'C';
        }
        else if (bottom.filter(function (value) { return value >= bottom[0]; }).length == 1) {
            sum += 1;
            forestCopy[i][j] = 'D';
        }
    };
    for (var j = 0; j < forestMatrix[i].length; j++) {
        _loop_1(j);
    }
}
for (var _a = 0, forestCopy_1 = forestCopy; _a < forestCopy_1.length; _a++) {
    var line = forestCopy_1[_a];
    writeCopy(String(line));
}
console.log('forest matrix lenght: ' + forestMatrix.length);
console.log('forest matrix width: ' + forestMatrix[66].length);
// // check row by row if there is visible trees
// for (let row of forestMatrix){
//     for (let i = 0; i < row.length; i++){
//         const leftSide = row.slice(0, i + 1)
//         const rightSide = row.slice(i, row.length);
//         if (rightSide.filter(value => value > rightSide[0]).length == 0 ){
//             sum += 1;
//         }
//         else if (leftSide.filter(value => value > leftSide.slice(-1)[0]).length == 0){
//             sum += 1
//         }
//     }     
// }
// //rotate matrix 90 degrees
// forestMatrix = forestMatrix[0].map((val, index) => forestMatrix.map(row => row[index]).reverse());
// console.log('Rotated')
// // check column by column if there is visible trees
// for (let column of forestMatrix){
//     for (let i = 0; i < column.length; i++){
//         const leftSide = column.slice(0, i + 1)
//         const rightSide = column.slice(i, column.length);
//         if (rightSide.filter(value => value > rightSide[0]).length == 0 ){
//             sum += 1;
//         }
//         else if (leftSide.filter(value => value > leftSide.slice(-1)[0]).length == 0){
//             sum += 1
//         }
//     }     
// }
console.log(sum);
// function rotate(matrix: number[][]){
//     return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
// }
// // create rows
// for (let i = 0; i < lines.length; i++){
//     let row: number[] = []
//     for (let j = 0; j < lines[0].length; j++){
//         row.push(parseInt(lines[i][j]))
//     }
//     rows.push(row)
// }
// // create columns
// for (let j = 0; j < lines[0].length; j++){
//     let column: number[] = [];
//     for (let i = 0; i < lines.length; i++){
//         column.push(parseInt(lines[i][j]))
//     }
//     columns.push(column)
// }
// let potentialRows: number[] = [];
// let potentialColumns: number[] = []; 
// for (const row in rows){
//     if (onlyOneTallTree(rows[row])){
//         potentialRows.push(parseInt(row)) // Save index to array
//     }
// }
// for (const column in columns){
//     if (onlyOneTallTree(columns[column])){
//         potentialRows.push(parseInt(column)) // Save index to array
//     }
// }
// function onlyOneTallTree(array: number[]){
//     array = array.sort((function(a,b){return a-b}));
//     let tallest = array.slice(-1)[0]
//     let hasOnlyOneTall = array.filter(number => number == tallest).length == 1;
//     return hasOnlyOneTall;
// }
// Check if row and column indexes match (match => tree is visible)
