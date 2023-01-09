import * as fs from 'fs';
const data = fs.readFileSync('inputs\\tehtava8_input.txt', 'utf8');
const lines: string[] = data.split(/\r?\n/);

function writeCopy(line: string){
    fs.appendFile('day7_visualizer.txt', '\n' + line, function (err) {
        if (err) {
          console.log(err)
        }
      })
}

function calculateScenicScore(arr: number[], startingIndex: 0 | -1): number{
    if (startingIndex === -1){
        arr.reverse()
    }
    for (let i = 1; i < arr.length; i++){
        let tree = arr[0] // height of tree under review
        if (arr[i] >= tree){
            return i;
        }
    }
    // then visible to the edge:
    return arr.length - 1
}

let sum = 0;
let scenicScores: number[] = [];
// build matrix from data
let forestMatrix: (number)[][] = [];
for (const line of lines){
    const row: number[] = [];
    for (let i = 0; i < line.length; i++){
        row.push(parseInt(line[i]))
    }
    forestMatrix.push(row)
}

// copy for visualizing
let forestCopy: (number|string)[][] = JSON.parse(JSON.stringify(forestMatrix));

for (let i = 0; i < forestMatrix.length; i++){
    for (let j = 0; j < forestMatrix[i].length; j++){
        let row = forestMatrix[i];
        let column = forestMatrix.map(row => row[j])

        const top = column.slice(0, i + 1);
        const bottom = column.slice(i, column.length);

        const leftSide = row.slice(0, j + 1)
        const rightSide = row.slice(j, row.length);

        let scenicScore = 0;

        const handleMatch = () => {  
            let score = calculateScenicScore(rightSide, 0)
            score *= calculateScenicScore(leftSide, -1)
            score *= calculateScenicScore(top, -1)
            score *= calculateScenicScore(bottom, 0);
            sum += 1;
            scenicScores.push(score);
        }

        if (rightSide.filter(value => value >= rightSide[0]).length == 1){
            forestCopy[i][j] = 'A';
            handleMatch();
        }
        else if (leftSide.filter(value => value >= leftSide.slice(-1)[0]).length == 1){
            handleMatch();
            forestCopy[i][j] = 'B';
        }
        else if (top.filter(value => value >= top.slice(-1)[0]).length == 1){
            handleMatch();
            forestCopy[i][j] = 'C';
        }
        else if (bottom.filter(value => value >= bottom[0]).length == 1){
            handleMatch();
            forestCopy[i][j] = 'D';
        }
    }
}

for (const line of forestCopy){
    writeCopy(String(line))
}

console.log('sum',sum);
console.log('max scenic score', Math.max(...scenicScores))

