# Tournament-Bracket-Maker
This will take a list of names and organize them into an orderly tournament.

I wrote this code to be able to create an easy and quick tournament bracket for any type of game. The user can upload their pre-made text file, or just use the in built system to create the list of names they will use for the tournament. It takes the names into a list and creates another list that has the range of numbers from 1 to the length of the name list to be used as place spots in the tournament. It will then take these 2 lists and randomly assign a number to a name and place the combination into a dictionary called brackets. Then it will take this dictionary and order it into another dictionary from least to greatest key value because I want it to print out in order on the resulting page. In order to use the current code here, you make the Participants.txt with all the names of the people you want in the tournament, seperated by pressing the enter key.

Future plans: I want to make the output page have boxes and the connecting lines that a normal bracket would look like.
I also want to have the program to create a multiplayer battle situation instead of just 1 v 1 battle.
Eventually I want to add in a GUI element and make it more user friendly, especially in adding the names to the tournament list.
Eventually it would be fun to add in a GUI element and make it more user friendly, especially in adding the names to the tournament list.


## Instructions
Cretate a web appliction that will consist of a few parts:
* Creating a Tournament
* Adding participants
* Running the Tournament
* Declaring a Victor

When Creating the Tournament you should have these inputs:
Tournament Name, Bracket Size, Tournament Date, Tournament Image

When adding participants to the tournament you should have thse inputs:
Name, Email, Password (This should be encrypted)

When running the tournament you should see a brakcet for the users, and you should be able to set who won for each round.

When declaring a victor their Win Ratio should increase and the others should decrease.

## Functional Requirements
You should have a backend server that has a .json file to serve as your Database. You should read/write to that Database file and load it up to get information. Information included in the file should be:
* Participants (data that is entered from the adding participant input and also generate an ID for them so that there can be multiple participants with the same name, but different emails)
* Tournaments which include each round and who won at each round as well as who won the tournament


## Things you should consider using
Here are some things to download:
* [IDE](https://code.visualstudio.com/)
* [Github Desktop](https://desktop.github.com/)
* [NodeJs](https://nodejs.org/en/)
* [Bootstrap](https://getbootstrap.com/)
* [React](https://reactjs.org/)


## What to do after you finish writing the application
After you have accumilated enough data (100 entries). You should write an application to read through your Database file and will determine that if playerA is matched up against playerB which player will win based on their win ratio against their opponents win ratio as well as how often they have one against their opponent.
