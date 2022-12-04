mostCalories = 0
sum = 0
elvs = 0
with open("utils/tehtava1_input.txt", "r") as f:
    lines = f.readlines() 
    for line in lines:
        if (line.strip()):
            sum += int(line.strip())
        elif (line == '\n' ):
            if (sum > mostCalories):
                mostCalories = sum 
            sum = 0
            elvs += 1
            

print(f'elvs: {elvs}, most calories: {mostCalories}')