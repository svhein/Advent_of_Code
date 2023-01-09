import * as fs from 'fs';
const data = fs.readFileSync('inputs\\tehtava4_input.txt', 'utf8');
const lines: string[] = data.split(/\r?\n/);
let subsets = 0;
let sames = 0;

for (let i = 0; i < lines.length; i++){
    let sections: string[] = lines[i].split(",");

    let limits1: number[] = (sections[0].split("-").map(item => parseInt(item))); 
    let section_1: number[] = [];
    for (let i = limits1[0]; i <= limits1[1]; i++){
        section_1.push(i)
    }

    let limits2: number[] = (sections[1].split("-").map(item => parseInt(item))); 
    let section_2: number[] = [];
    for (let i = limits2[0]; i <= limits2[1]; i++){
        section_2.push(i)
    }
    
    const isSubset =  section_2.every(value => section_1.includes(value)) || section_1.every(value => section_2.includes(value));
    const same = section_2.some(value => section_1.includes(value));
    if (isSubset){
        subsets += 1;
    }
    if (same){
        sames += 1;
    }

}

console.log('Subsets', subsets)
console.log('Sames', sames)


