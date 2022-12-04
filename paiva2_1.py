# A for Rock, B for Paper, and C for Scissors
# X for Rock, Y for Paper, and Z for Scissors
# 1 for Rock, 2 for Paper, and 3 for Scissors
# 0 if you lost, 3 if the round was a draw, and 6 if you won

shapePoint = {
    'rock' : 1,
    'paper' : 2,
    'scissor' : 3
}

gamePoint = {
    'lost' : 0,
    'draw' : 3,
    'win' : 6
}

opponentShapes = {
    'A' : 'rock',
    'B' : 'paper',
    'C' : 'scissor'
}

myShapes = {
    'X' : 'rock',
    'Y' : 'paper',
    'Z' : 'scissor'
}

def winShape(shape):
    return {
    'rock' : 'scissor',
    'paper' : 'rock',
    'scissor' : 'paper'
    }[shape]
            
points = 0

with open("inputs/tehtava2_input.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        opponentShape, myShape = opponentShapes[line[0]], myShapes[line[2]]
        if (winShape(myShape) == opponentShape):
            points += shapePoint[myShape]
            points += gamePoint['win']
        elif (winShape(opponentShape) == myShape):
            points += shapePoint[myShape]
            points += gamePoint['lost']
        elif (opponentShape == myShape):
            points += shapePoint[myShape]
            points += gamePoint['draw']
        
print(points)