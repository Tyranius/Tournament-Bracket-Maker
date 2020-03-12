# Tournament-Bracket-Maker
This will take a list of names and organize them into an orderly tournament.

I wrote this code to be able to create an easy and quick tournament bracket for any type of game. The user can upload their pre-made text file, or just use the in built system to create the list of names they will use for the tournament. It takes the names into a list and creates another list that has the range of numbers from 1 to the length of the name list to be used as place spots in the tournament. It will then take these 2 lists and randomly assign a number to a name and place the combination into a dictionary called brackets. Then it will take this dictionary and order it into another dictionary from least to greatest key value because I want it to print out in order on the resulting page. In order to use the current code here, you make the Participants.txt with all the names of the people you want in the tournament, seperated by pressing the enter key.

Future plans: I want to make the output page have boxes and the connecting lines that a normal bracket would look like.
I also want to have the program to create a multiplayer battle situation instead of just 1 v 1 battle.
Eventually I want to add in a GUI element and make it more user friendly, especially in adding the names to the tournament list.
