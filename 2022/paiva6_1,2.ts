import * as fs from 'fs';
const data = fs.readFileSync('inputs\\tehtava6_input.txt', 'utf8');

let cache: string[] = [];
let set =  new Set<string>();
let answer: string;

const MARKER_LENGTH = 14

for(let i = 0; i < data.length; i++){
    if (cache.length == MARKER_LENGTH){ cache.splice(0,1) } // Remove first element of cache
    cache.push(data[i]) // Add new element to cache
    if (cache.length == MARKER_LENGTH){ 
        set = new Set(cache)
    }
    if (set.size == MARKER_LENGTH){
        answer = cache[0];
        console.log(cache)
        console.log(answer)
        console.log('Number: ', i + 1)
        break;
   }
}





