import React, { useState } from 'react';
import './Fixture.css';

const FixtureGenerator = ({ fixtures, onWinnerSelection }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleWinner = (participant) => {
    onWinnerSelection(participant);
    setSelectedParticipant(participant);
  };

  return (
    <div className="fixtures-container">      
      {fixtures.map((fixture, index) => (
        <div key={index} className="fixture">
          <p>{fixture.match}</p>

          <button className='btn' 
                  onClick={() => handleWinner(fixture.match.split(" vs ")[0])}>
                  Scores
          </button>
          
          <button className='btn' onClick={() => handleWinner(fixture.match.split(" vs ")[0])}>{fixture.match.split(" vs ")[0]}</button>
          <button className='btn' onClick={() => handleWinner(fixture.match.split(" vs ")[1])}>{fixture.match.split(" vs ")[1]}</button>
        </div>
      ))}
    </div>
  );
};

export default FixtureGenerator;
