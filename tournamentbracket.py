import random

answer = input("Would you like to use your own file? 'Yes' or 'No': ")
if answer.lower() == "yes":
    filename = input("Enter filename: ")
    with open(filename) as fh:
        text = fh.read()

elif answer.lower() == "no":
    #To ensure the input is a number
    try:
        peep_num = int(input("How many participants? "))
    except ValueError:
        print("Please enter a whole number")

    # Allows the user to put their own names into the file
    with open("Participants.txt", "w") as fh:
        for i in range(peep_num):
            Name = input("Input Name: ")
            fh.write(Name + "\n")

    # Had to seperate the open commands to overwrite any old versions.
    with open("Participants.txt", "r") as fh:
        text = fh.read()

else:
    print("Please enter 'Yes' or 'No'")

# Read and separate the names in the file
names = text.split()

#Create an empty dictionary to load with the place and name as key and value respectively
bracket = {}

#This is to create a list to remove the random place numbers from
par_number = list(range(1, len(names) + 1))

#The dictionary is used to connect the player with a random number and store it all for use later. It also removes the
#place from the par_number list to ensure it won't be grabbed again for another participant.
for name in names:
    x = random.choice(range(0, len(par_number)))
    slot = par_number[x]
    bracket[slot] = name
    par_number.remove(slot)

#Creating an empty dictionary for when bracket is ordered least to greatest.
rankings = {}

#This was the way I chose to organize the bracket from least to greatest in rankings because this is how I chose to
#make the program print the combinations of people in order.
while len(bracket) != 0:

    #This is just the maximum for the need of a high number. This can be increased if necessary.
    b = 100

    #The for loop takes it through the bracket dictionary and finds the smallest key value available
    for k in bracket.keys():
        if k < b:
            b = k

    #This loads up the rankings dictionary with the ordered participants from lowest to highest position
    rankings[b] = bracket[b]

    #This removes the key/value pair from the brackets dictionary which allows the while loop to end
    del bracket[b]

#This puts a bye in for the last key/value pair if the dictionary was an odd numbered length because I wanted more
#usability with the printed document at the end.
if len(rankings)%2 != 0:
    rankings[len(rankings)+1] = "Bye"
print(rankings)

#This will create a new file Tournament which will present all of the names in order of play
with open("Tournament.txt", "w") as file:
    for key in rankings:
        file.write(str(key) + ":  " + rankings[key] + "\n\n")