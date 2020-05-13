import React, { useEffect, useState } from 'react';

// Create Bracket
// Update Bracket (Who Won)
// Add Participants
// Upload a Participants

// COMPONENT -> React Lingo
// 2 kinds of component: Functional Component | Class Component
// Functional Component -> Function
const Participants = ({ something }) => {
    // State -> Encapsulated Information that only this component has access to.
    // useState == ReactJS. useState -> create a variable & a setter for that variable and only do this one time.
    const [participants, setParticipants] = useState(["Show me some participants please"]);
    const [isLoading, setIsLoading] = useState(true);
    // Javascript identifiers: const, let, var

    // useEffect => ReactJS hook. What it does is it runs a function everytime a value in its dependency array changes (from props or state)
    // However if you leave it blank it will only run the first time the component is mounted (similar to rendered)
    useEffect(() => {
        const loadParticipantsAsync = async () => {
            setIsLoading(true);
            const participantsResp = await fetch('http://localhost:3000/participants');
            if (participantsResp.status === 200) {
                const participantsJson = await participantsResp.json();
                setParticipants(participantsJson.participants);
            }

            setIsLoading(false);
        }

        loadParticipantsAsync();
    }, []);

    // 2x2 grid
    // setting player a vs player b
    //Button next to each player that says winner
    // it will set wins / losses.
    // Players who won previous round will be set against players who won that same round.
    // Place tournament victor in a big old h1 (their name)

    // Render ReactJS Component
    return (<div>
        <h2>
            Participants ({something})
        </h2>
        {
            isLoading
                ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <ul>
                            {
                                participants.map((participant) => {
                                    return (
                                        <li>{participant.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
        }
    </div>
    );
};

export default Participants;