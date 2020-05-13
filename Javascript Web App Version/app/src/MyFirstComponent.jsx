import React from 'react';
import Participants from './Participants.jsx';

const MyFirstComponent = () => {
    const something = 5;
    return (
        <div>
            <h2>
                Tournament Bracket ({something})
            </h2>
            <Participants something={something} />
        </div>
    );
};

export default MyFirstComponent;