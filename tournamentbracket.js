//import random = Math.random()
const fs = require("fs");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let requestUserInput = () => {
    readline.question("Would you like to use your own file? \"Yes\" or \"No\" \"Quit\"",
        (answer) => {
            if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "no" && answer.toLowerCase() !== "quit") {
                console.log("Please enter \"Yes\" or \"No\" \"Quit\"")
                requestUserInput();
                return;
            }

            if (answer.toLowerCase() === "yes") { //start here YES Yes yEs        
                parseUserFile();
            }
            else if (answer.toLowerCase() === "no") {
                generateFileFromUserInput();
            } else {
                process.exit();
            }
        });
};

let parseUserFile = () => {
    readline.question("Enter the file path: ", (path) => {
        try {
            let fileText = fs.readFileSync(path, { encoding: "utf8" })
            generateBracketFromInput(fileText);
        }
        catch (err) {
            console.error(err);
        }
    })
}

let generateFileFromUserInput = () => {
    readline.question("How many participants do you have?", (participantsString) => {
        //try catch me
        try {
            let participants = Math.trunc(parseInt(participantsString, 10));
            requestPlayerName(1, participants);
        }
        catch (err) {
            console.error(err);
            //loop back through, but needs an if/else statement
        }
    })
}

let requestPlayerName = (index, participants, players) => {
    if (index === participants) {
        generateBracketFromInput(players);
    }

    readline.question("Type the participant's name: ", (participantName) => {
        return players += `${participantName}\n${requestPlayerName(index++, participants)}`;
    });
}
///Users/danielzrust/Documents/GitHub/Tournament-Bracket-Maker/bracket.txt
let generateRandomNumberArray = (numberOfParticipants) => {
    let randomArray = [];
    for (let i = 0; i < numberOfParticipants; i++) {
        randomArray[i] = i;
    }
    for (let i = 0; i < numberOfParticipants; i++) {
        let j = Math.trunc(Math.random() * numberOfParticipants-1);
        let temp = randomArray[i];
        randomArray[i] = randomArray[j];
        randomArray[j] = temp;
    }
    return randomArray;
}

let generateBracketFromInput = (input) => {
    let text = `${input}`
    // Read and separate the names in the file
    let names = text.split("\n")

    // Create an empty HashMap to load with the place and name as key and value respectively
    let bracket = {}

    // This is to create a list to remove the random place numbers from
    let randomParticipantBracketArray = generateRandomNumberArray(names.length);
    console.log(randomParticipantBracketArray);

    // The dictionary is used to connect the player with a random number and store it all for use later. It also removes the
    // place from the par_number list to ensure it won't be grabbed again for another participant.
    for (let i = 0; i < names.length; i++) {
        bracket[randomParticipantBracketArray[i]] = names[i];
        if (i + 1 === names.length && names.length % 2 !== 0) {
            bracket[i + 1] = "Bye";
        }
    }

    for (let i = 0; i <= names.length+1; i+=2) {
        if (i + 1 <= names.length+1) {
            console.log(`${bracket[i]} VS ${bracket[i + 1]}`);
        }
    }

    process.exit();
}

requestUserInput();




