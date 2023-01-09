calories = []
summa = 0
with open("utils/tehtava1_input.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        if (line.strip()):
            summa += int(line.strip())
        elif (line == '\n'):
            calories.append(summa)
            summa = 0

calories.sort()
three = sum(calories[-3:])
print(three)