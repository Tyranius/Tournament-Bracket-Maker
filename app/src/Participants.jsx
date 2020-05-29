import React, { useEffect, useState, useContext } from 'react';
import { AppNavigationContext } from "./App.jsx";
// Create Bracket
// Update Bracket (Who Won)
// Add Participants
// Upload a Participants

// COMPONENT -> React Lingo
// 2 kinds of component: Functional Component | Class Component
// Functional Component -> Function
const Participants = ({ }) => {
    // State -> Encapsulated Information that only this component has access to.
    // useState == ReactJS. useState -> create a variable & a setter for that variable and only do this one time.
    const [participants, setParticipants] = useState(["Show me some participants please"]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useContext(AppNavigationContext);
    // Javascript identifiers: const, let, var
    const loadParticipantsAsync = async () => {
        setIsLoading(true);
        const participantsResp = await fetch('http://localhost:3000/participants');
        if (participantsResp.status === 200) {
            const participantsJson = await participantsResp.json();
            setParticipants(participantsJson.participants);
        }

        setIsLoading(false);
    }
    // useEffect => ReactJS hook. What it does is it runs a function everytime a value in its dependency array changes (from props or state)
    // However if you leave it blank it will only run the first time the component is mounted (similar to rendered)
    useEffect(() => {
        loadParticipantsAsync();
    }, []);

    const onDelete = async (id) => {
        const apiResponse = await fetch(`http://localhost:3000/participants/${id}`, {
            method: 'DELETE'
        });

        // google: "How do i do a delete api call using fetch"
        if (apiResponse.status === 200) {
            setParticipants(participants.filter((participant) => participant.id !== id));
        }
    };
    
    // Ensure same participant can't be chosen to fight again
    const createBracketImage = () => {
        let rows = [];
        let participantID = [];
        for (let rowNum = 0; rowNum < 2 /*eventually numPart/2*/; rowNum++) {
            let rowID = `row${rowNum + 1}`;
            let cell = [];
            for (let cellNum = 0; cellNum < 3; cellNum++) {
                // don't allow it to produce the same number
                // maybe remove it from an array instead
                let partIDNum = 1 + Math.floor(Math.random() * 3);
                let cellID = `cell${rowNum}-${cellNum}`;
                if (cellNum == 1) {
                    cell.push(<td key={cellID} id={cellID}>vs.</td>)
                }
                else if (!participantID.includes(partIDNum)) {
                    cell.push(<td key={cellID} id={cellID}>{/*participant.id*/}</td>)
                };
                participantID.push(partIDNum);
            };
            rows.push(<tr key={rowNum} id={rowID}>{cell}</tr>)
        };
    };

    // 2x2 grid
    // setting player a vs player b
    // Button next to each player that says winner
    // it will set wins / losses.
    // Players who won previous round will be set against players who won that same round.
    // Place tournament victor in a big old h1 (their name)

    // Render ReactJS Component
    return (<div>
        <h2>
            Participants
        </h2>
        {
            isLoading
                ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <div>
                            {
                                participants.map((participant) => {
                                    return (
                                        <div key={participant.id}>
                                            <div>
                                                {participant.name}, Wins: {participant.wins}, Losses: {participant.losses}
                                            </div>
                                            <div>
                                                <button onClick={() => navigation.navigate("edit-participants", participant)}>Edit</button>
                                            </div>
                                            <div>
                                                <button onClick={() => onDelete(participant.id)}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
        }
        <button onClick={() => navigation.navigate("edit-participants", {})}>Add Participant</button>
    </div>
    );
};

export default Participants;