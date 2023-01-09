import * as fs from 'fs';
const data = fs.readFileSync('./inputs/tehtava7_input.txt', 'utf8');
const lines: string[] = data.split(/\r?\n/);

class node{
    name: string;
    parent: node;
    isDirectory: boolean;
    size: number;
    children: node[];

    constructor(name: string, isDirectory: boolean, parent: node = null!, size: number = 0){
        this.name = name;
        this.parent = parent;
        this.isDirectory = isDirectory
        this.size = size;
        this.children = [];
    }
}

const root = new node('/', true);

let currentPosition = root;

for (let i = 0; i < lines.length; i++){
    if (lines[i][0] == '$'){
        const words = lines[i].split(" ");
        const command = words[1];
        const value = words[2];

        if (command == 'cd' && value == '..'){
            currentPosition = currentPosition.parent;
        }
        else if (command == 'cd' && value == '/') {
            currentPosition = root;
        }
        // second value is a directory name
        else if (command == 'cd' && value != '..'){
            // check if value is aldready child
            if (currentPosition.children.some(nd => nd.name == value)){
                currentPosition = currentPosition.children.filter(nd => {
                    return nd.name == value;
                })[0]
            // node doesnt exist
            }else { 
                let newNode = new node(value, true, currentPosition);
                currentPosition.children.push(newNode);
                currentPosition = newNode;
            }
        }
    }
    // Othewrise the line is director- or filename (e.g dir xyzl)
    else {
        const words = lines[i].split(" ")
        if (words[0] == 'dir'){
            currentPosition.children.push(new node(words[1], true, currentPosition))
        }
        // else its its files size and its name
        else{
            const fileSize = parseInt(words[0]);
            const name = words[1];
            currentPosition.children.push(new node(name, false, currentPosition, fileSize))
        }
    }
}

let tree = calculate_dir_sizes(root);

// QUESTION 1
// console.log(sum(tree)) // Answer 1
// console.log(findDirectoryToRemove(tree))

// QUESTION 2
findDirectoryToRemove(tree);


//
// FUNCTIONS
//
function calculate_dir_sizes(root: node){
    let stack = [root];
 
    while (stack.length > 0){
        let top: node = stack.pop()!;

        if (top.isDirectory){
            top.size = dir_size(top);
        }
        stack = stack.concat(top.children)
    }
    return root;
}

/**
 * Recursive function calculating size of node including children
 * @param dir 
 * @returns Directory size
 */
function dir_size(dir: node){
    let size = dir.size;
    if (dir.children.length > 0 ){
        for (let i = 0; i < dir.children.length; i++){
            size += dir_size(dir.children[i])
        }
    }
    return size;
}

/**
 * Deep first search for tree
 * @param root Root node of the tree
 * @returns 
 */
function sum(root: node){
    let stack = [root];
    let threshold = 100000;
    let sum = 0;
    while (stack.length > 0){
        let top = stack.pop()!;
        if (top.isDirectory && top.size < 100000){
            sum += top.size
            console.log(top.name, top.size)
        }
        stack = stack.concat(top.children)
    }
    return sum;
}

function rootSize(root: node){
    let stack = [root];
    let sum = 0;
    while (stack.length > 0){
        let top = stack.pop()!;
        if (top.isDirectory && top.size < 100000){
            sum += top.size
            // console.log(top.name, top.size)
        }
        stack = stack.concat(top.children)
    }
    return sum;
}
/**
 * Logs result to question 2
 * @param root 
 * @returns 
 */
function findDirectoryToRemove(root: node){
    const rootSize = root.size;
    const totalSpace = 70000000;
    const requiredSpace = 30000000;
    const freeSpace = totalSpace - rootSize;
    console.log('rootSize', rootSize)
    console.log('freeSpace', freeSpace);
    let dict_sizes: number[] = [];

    let stack = [root];
    while (stack.length > 0){
        let top = stack.pop()!;
        if (top.isDirectory){
            dict_sizes.push(top.size)
        }
        stack = stack.concat(top.children)
    }
    dict_sizes = dict_sizes.sort((function(a,b){return a-b}));
    for (let i = 0; i < dict_sizes.length; i++){
        if (freeSpace + dict_sizes[i] > requiredSpace){
            console.log('Dict size', dict_sizes[i]);
            break;
        }
    }

    return dict_sizes;
}