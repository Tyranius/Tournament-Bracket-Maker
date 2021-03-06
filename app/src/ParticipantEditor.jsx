import React, { useState } from 'react';
import { AppNavigationContext } from "./App.jsx";

export const ParticipantEditor = ({ participant }) => {
    const [name, setName] = useState(participant.name || ""); //hook function
    const [wins, setWins] = useState(participant.wins || 0);
    const [losses, setLosses] = useState(participant.losses || 0);
    const navigation = React.useContext(AppNavigationContext);
    const [isLoading, setIsLoading] = useState(false);

    const onSave = async () => {
        setIsLoading(true);
        const participantResp = await fetch('http://localhost:3000/participants', {
            body: JSON.stringify({
                id: participant.id,
                name,
                wins,
                losses
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: participant.id !== undefined ? "put" : "post"
        });
        setIsLoading(false);
        if (participantResp.status === 200) {
            navigation.navigate("participants", null);
        } else {
            alert("Failed to save, please try again");
        }
    }

    if (isLoading) return <div>Saving...</div>;
    return (
        <div>
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Participant Name" />
            <input value={wins} onChange={(event) => setWins(event.target.value)} type='number' placeholder='Number of Wins' />
            <input value={losses} onChange={(event) => setLosses(event.target.value)} type='number' placeholder='Number of Losses' />
            <button onClick={onSave}>Save</button>
            <button onClick={() => navigation.navigate("participants", null)}>Cancel</button>
        </div>
    )
};
