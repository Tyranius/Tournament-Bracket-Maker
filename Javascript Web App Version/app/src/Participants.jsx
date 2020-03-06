import React, { useEffect, useState } from 'react';

const Participants = () => {
    const [participants, setParticipants] = useState(["Show me some participants please"]);
    const [isLoading, setIsLoading] = useState(true);
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
    }, [])
    return (<div>
        <h2>
            Participants
        </h2>
        {
            isLoading
                ? (
                    <img src="public/loader.gif" height={250} width={250} />
                ) : (
                    <div>
                        <ul>
                            {
                                participants.map((participant) => {
                                    return (
                                        <li>{participant}</li>
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