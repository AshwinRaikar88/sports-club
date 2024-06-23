import React, { useState, useEffect } from 'react';
import ParticipantSelection from '../components/Fixtures/ParticipantsSelection.jsx';
import FixtureGenerator from '../components/Fixtures/FG2.jsx';
import TournamentTable from '../components/TournamentTable/TournamentTable.jsx';
import FileUpload from '../components/DragDrop/FileUpload.jsx';

import '../Styles/Main.css';

function MainArea() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [levels, setLevels] = useState([{ participants: [...selectedParticipants], winners: [] }]);
  const [isShuffle, setShuffle] = useState(false);

  const [tournamentData, setTournamentData] = useState({});
  const [tournamentName, setTournamentName] = useState(tournamentData.tournament_name);

  const handleSelection = (participant) => {
    setSelectedParticipants([...selectedParticipants, participant]);
    setParticipants(participants.filter((p) => p.id !== participant.id));
  };

  const handleShuffle = () => {
    setSelectedParticipants(shuffleArray(participants));
    setShuffle(true);
  };

  const handleTDataUpdate = (newData) => {
    setTournamentData((prevData) => ({
      ...prevData,
      ...newData
    }));
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
        }
    }
    setLevels(updatedLevels);
  };

  useEffect(() => {
    setLevels([{ participants: [...selectedParticipants], winners: [] }]);
  }, [selectedParticipants]);

  useEffect(() => {
    setTournamentData((prevData) => ({
      ...prevData,
      tournament_name: tournamentName
    }));
  }, [tournamentName]);

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

  const handleTournamentNameChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z0-9\s]*$/.test(inputValue)) {
      setTournamentName(inputValue);
    }
    console.log(tournamentName);
  };

  return (
    <main className='main'>
      <div className='tournamentNameField'>
        <label htmlFor="tournamentName"></label>
        <input
          type="text"
          id="tournamentName"
          required
          value={tournamentName}
          onkeydown="return /[a-zA-Z0-9\s]/i.test(event.key)"
          placeholder={'Enter Tournament Name'}
          onChange={handleTournamentNameChange}
        />
      </div>
      
      {!isShuffle ? (
        <div>
          <FileUpload handleUpload={handleUpload} />
          
          {participants.length === 8 && (tournamentName !== undefined && tournamentName !== '') && <button className='MbtnSubmit' onClick={handleShuffle}>Start</button>}

          <ParticipantSelection
            participants={participants}
            selectedParticipants={selectedParticipants}
            onSelection={handleSelection}
          />
          
          {/* {participants.length === 8 && <button className='MbtnSubmit' onClick={handleShuffle}>Start</button>} */}
        </div>
      ) : (
        <div>
          <div className='match_area'>
            {levels.length <= 2 && (<h2>Round {levels.length} Matches</h2>)}
            {levels.length === 3 && (<h2>Grand Finale</h2>)}

            <FixtureGenerator
            tName={tournamentData["tournament_name"]}
              fixtures={generateFixtures(levels[levels.length - 1].participants)}
              onWinnerSelection={handleWinnerSelection}
              onTDataUpdate={handleTDataUpdate}
            />
          </div>

          <div className='tree_container'>
            <div className='tree_items'>
              <h3>Matches</h3>
              <hr className="h3-divider" />
              <ul className="participant-list">
                {selectedParticipants.map((participant, index) => (
                  <React.Fragment key={participant.id}>
                    <li className='list'>{participant.name}</li>
                    {(index + 1) % 2 === 0 && <hr className="list-divider" />}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            {levels.map((level, index) => (
              <div key={index}>
                {level.winners.length > 0 ? (
                  <div className='tree_items'>
                    {index === 0 && <h3>Semi-finals</h3>}
                    {index === 1 && <h3>Final</h3>}
                    {index === 2 && <h3>Winner</h3>}
                    {index < 3 && <hr className="h3-divider" />}
                    
                    <ul className="participant-list">
                      {level.winners.map((winner, winnerIndex) => (
                        <React.Fragment key={winnerIndex}>
                          <li className='list'>{winner}</li>
                          {(winnerIndex + 1) % 2 === 0 && <hr className="list-divider" />}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                ) : ''}
              </div>
            ))}

              <TournamentTable tournamentData={tournamentData} />
          </div>

        </div>
      )}
      
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
    matches.push({ match, id, scores });
  }
  return matches;
};

export default MainArea;
