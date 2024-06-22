import React, { useState, useEffect } from 'react';

import '../Styles/Main.css'

import ParticipantSelection from '../components/Fixtures/ParticipantsSelection.jsx';
import FixtureGenerator from '../components/Fixtures/FG2.jsx';

function MainArea() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [levels, setLevels] = useState([{ participants: [...selectedParticipants], winners: [] }]);
  const [fixturesGenerated, setFixturesGenerated] = useState(false);

  const [isShuffle, setShuffle] = useState(false);

  const handleSelection = (participant) => {
    setSelectedParticipants([...selectedParticipants, participant]);
    setParticipants(participants.filter((p) => p.id !== participant.id));
  };

  const handleShuffle = () => {
    setSelectedParticipants(shuffleArray(participants));
    setShuffle(true);
    // setParticipants(participants.filter((p) => p.id !== participant.id));
  };

  const handleWinnerSelection = (winner) => {
    const updatedLevels = [...levels];
    const currentLevel = updatedLevels[updatedLevels.length - 1];

    const winnerAlreadySelected = currentLevel.winners.includes(winner);
    
    if (!winnerAlreadySelected) {
        currentLevel.winners.push(winner);
    
        if (currentLevel.winners.length === currentLevel.participants.length / 2) {
          // All winners for this level are selected
          const nextLevelParticipants = currentLevel.winners.map((winner, index) => ({
            id: index + 1,
            name: winner
          }));
          updatedLevels.push({ participants: nextLevelParticipants, winners: [] });
          setFixturesGenerated(false); // Reset fixtures generation for the next round
        }
    }

    setLevels(updatedLevels);
  };
  

useEffect(() => {
  setLevels([{ participants: [...selectedParticipants], winners: [] }]);
}, [selectedParticipants]);

const handleUpload = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const jsonData = JSON.parse(e.target.result);
      setParticipants(jsonData);
    } catch (error) {
      console.error('Error parsing uploaded file:', error);
    }
  };

  reader.readAsText(file);
};

  return (
    <main className='main'>
      <h2>Badminton Tournament</h2>
      {/* <p>Champions league</p> */}
      
    <div>
      { !isShuffle ? 
      (<div><ParticipantSelection participants={participants} 
                             selectedParticipants={selectedParticipants} 
                             onSelection={handleSelection} />
                            
        { (participants.length === 8 ) ? <button className='MbtnSubmit' onClick={() => handleShuffle()}>Start</button>: ''}
                          
        {/* <button onClick={fetchData}>Fetch Data</button> */}
        <input type="file" accept=".json" onChange={handleUpload} />
        </div>                 
      ) 
      : 
      (
        <div> 
          {levels.length < 4 && (<div className='match_area'>
          {levels.length <= 2 && (<h2>Round {levels.length} Matches</h2>)}
            {/* {levels.length 3 && (<h2>Semi-final Matches</h2>)} */}
            {levels.length === 3 && (<h2>Grand Finale</h2>)}
            
            {!fixturesGenerated && (
              <FixtureGenerator
                fixtures={generateFixtures(levels[levels.length - 1].participants)}
                onWinnerSelection={handleWinnerSelection} 
              />)}

          </div>)}

          <div className='tree_container'>
            <div className='tree_items'>
              <h3>Round 1</h3>
              <hr className="h3-divider" />
              <ul className="participant-list">           
                {selectedParticipants.map((participant, index) => (
                  <React.Fragment key={participant.id}>
                    <li className='list'>{participant.name}</li>
                    {(index + 1) % 2 === 0   && <hr className="list-divider" />}
                  </React.Fragment>
                ))}
              </ul>
          </div>

            {levels.map((level, index) => (
              <div key={index}>
                { index < 3  ?<div className='tree_items'>
                {index < 1 && <h3>Round 2:</h3>}
                {index === 1 && <h3>Semi-final:</h3>}
                {index === 2 && <h3>Final:</h3>}
                {index < 3 && <hr className="h3-divider" />}
                
                <ul className="participant-list">           
                  {level.winners.map((winner, winnerIndex) => (
                    <React.Fragment key={winnerIndex}>
                      <li className='list' key={winnerIndex}>{winner}</li>
                      {(winnerIndex+1) % 2 === 0 && <hr className="list-divider" />}
                    </React.Fragment>
                  ))}
                </ul>
                </div>: ''}
              </div>
              ))}
          </div>
        </div>
      )}
      
    </div>
    </main>
  );  
}

// Function to shuffle array in place
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
  

// Function to generate fixture slots
const generateFixtures = (participants) => {
  const matches = [];
  for (let i = 0; i < participants.length - 1; i += 2) {
    const match = `${participants[i].name} vs ${participants[i + 1].name}`;
    const id = i / 2;
    const scores = [0, 0];
    matches.push({ match, id , scores});
  }
  return matches;
};
  

export default MainArea;