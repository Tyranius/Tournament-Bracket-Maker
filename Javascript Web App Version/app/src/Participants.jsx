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

    /*createBracketImage(() => {
    
    });*/

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
                                                <button onClick={() => { alert("Implement me") }}>Delete</button>
                                            </div>
                                        </div>
                                        //     <div key={participant.wins}>
                                        //         <div>
                                        //             {participant.wins}
                                        //         </div>
                                        //         <div>
                                        //             <button onClick={() => navigation.navigate("edit-participants", participant)}>Edit</button>
                                        //         </div>
                                        //     </div>
                                        //     <div key = {participant.losses}>
                                        //         <div>
                                        //             {participant.losses}
                                        //         </div>
                                        //         <div>
                                        //             <button onClick = {() => navigation.navigate("edit-participants", participant)}>Edit</button>
                                        //         </div>
                                        //     </div>
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