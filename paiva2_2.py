# A for Rock, B for Paper, and C for Scissors (opponent)
# X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win

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

myMoves = {
    'X' : 'lost',
    'Y' : 'draw',
    'Z' : 'win'
}

def loseShape(shape: str) -> str:
    '''Returns shape that loses to the argument shape'''
    return {
    'rock' : 'scissor',
    'paper' : 'rock',
    'scissor' : 'paper'
    }[shape]
    
def winShape(shape: str) -> str:
    '''Returns shape that wins the argument shape'''
    return {
        'rock' : 'paper',
        'paper' : 'scissor',
        'scissor' : 'rock'
    }[shape]
    
points = 0
    
with open("inputs/tehtava2_input.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        opponentShape = opponentShapes[line[0]]
        myMove = myMoves[line[2]]
        if (myMove == 'win'):
            points += gamePoint['win']
            points += shapePoint[winShape(opponentShape)]
        elif (myMove == 'draw'):
            points += gamePoint['draw']
            points += shapePoint[opponentShape]
        elif (myMove == 'lost'):
            points += gamePoint['lost']
            points += shapePoint[loseShape(opponentShape)]
            print(f'mymove {myMove} loseshape {loseShape(opponentShape)} ')

print(points)
        
        
        
        
    