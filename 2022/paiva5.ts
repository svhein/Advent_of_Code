import * as fs from 'fs';
let answer: string = "";

let stacks: { [stack: number]: string[]} = {
    1 : ['s', 'c', 'v', 'n'],
    2 : ['z', 'm', 'j', 'h', 'n', 's'],
    3 : ['m', 'c', 't', 'g', 'j', 'n', 'd'],
    4 : ['t', 'd', 'f', 'j', 'w', 'r', 'm'],
    5 : ['p', 'f', 'h'],
    6 : ['c', 't', 'z', 'h', 'j'],
    7 : ['d', 'p', 'r', 'q', 'f', 's', 'l', 'z'],
    8 : ['c', 's', 'l', 'h', 'd', 'f', 'p', 'w'],
    9 : ['d', 's', 'm', 'p', 'f', 'n', 'g', 'z']
}

const data = fs.readFileSync('inputs\\tehtava5_input.txt', 'utf8');
const lines: string[] = data.split(/\r?\n/);

for (let i = 0; i < lines.length; i++){
    let split = lines[i].split(" ");
    let amount: number = parseInt(split[1]);
    let from: number = parseInt(split[3]);
    let to: number = parseInt(split[5]);

    let popped = stacks[from].splice(-amount, stacks[from].length);
    
    // Merge popped and stack where they are moved
    // popped.reverse() // In part 1 you reverse popped, in part 2 you dont
    stacks[to] = stacks[to].concat(popped)
}

for (let i = 1; i <= Object.keys(stacks).length; i++){
    let char = stacks[i].slice(-1);
    answer += char[0].toUpperCase();
}

console.log(stacks)

console.log(answer)
