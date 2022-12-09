import * as fs from 'fs';

let alphabets: {[index: string]:number} = {}

// Add small chars to alphabets dict
for (let i = 97; i < 123; i++){
    alphabets[String.fromCharCode(i)] = i - 96
}
// Add big 
for (let i = 65; i < 91; i++){
    alphabets[String.fromCharCode(i)] = i - 64 + 26
}

const data = fs.readFileSync('2022\\inputs\\tehtava3_input.txt', 'utf8');
let sum: number = 0;

const lines: string[] = data.split(/\r?\n/);

for (let i = 0; i <= lines.length; i = i + 3){
    let setA = new Set(lines[i]);
    let setB = new Set(lines[i + 1]);
    let setC = new Set(lines[i + 2]);

    let intersection1 = ([...setA].filter(x => setB.has(x))); // Intersection of A and B
    let intersection2 = ([...intersection1].filter(x => setC.has(x))); // (A and B) and C

    intersection2.map((key, value) => {
        sum = sum + alphabets[key]
    });
}

console.log(sum)
