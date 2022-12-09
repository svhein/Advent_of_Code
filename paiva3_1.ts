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

const data = fs.readFileSync('inputs/tehtava3_input.txt', 'utf8');
let sum: number = 0;

data.split(/\r?\n/).forEach(line => {
    let chars: string[] = []
    let n: number = line.length / 2
    let foundDuplicates: string[] = []

    for (let i = 0; i < line.length; i++){
        let char: string = line[i]
        if(i < n){
            chars.push(char)
        }
        else if (chars.includes(char) && i >= n){
            if (!foundDuplicates.includes(char)){
                foundDuplicates.push(char)
                sum = sum + alphabets[char]
            }
        }
    }
    console.log(line)
    console.log(foundDuplicates)

})
console.log(sum)
