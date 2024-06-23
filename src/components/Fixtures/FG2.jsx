import React, { useState, useEffect } from 'react';
import './Fixture.css';

const FixtureGenerator = ({ fixtures, tName, onWinnerSelection, onTDataUpdate}) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [roundIndex, setRoundIndex] = useState(1);
  const [matchIndex, setMatchIndex] = useState(1);
  const [currIndex, setCurrIndex] = useState(0);
  const [data, setData] = useState(fixtures);
  const [stopUpdating, setStopFlag] = useState(false);

  
  const [tournamentData, setTournamentData] = useState({
    tournament_name: tName,
    round1: [],
    round2: [],
    round3: [],
  });

  const handleIndex = (index) => {
    setCurrIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    if (matchIndex == 8){
      saveTournamentData();
    }
    onTDataUpdate(tournamentData);
    console.log(tournamentData);
  }, [matchIndex]);

  useEffect(() => {   
    if (!stopUpdating){
        setData(fixtures);
    }
  }, [fixtures]);

  const deleteFixture = (id) => {
    setData(prevFixtures => {
      return prevFixtures.filter(fixture => fixture.id !== id);
    });
  };

  const handleWinner = () => {
    const { scores } = data[currIndex];
    const [scoreParticipant1, scoreParticipant2] = scores;
  
    const winner = scoreParticipant1 > scoreParticipant2
      ? `${data[currIndex].match.split(" vs ")[0]}`
      : `${data[currIndex].match.split(" vs ")[1]}`;
    
    // const winner = scoreParticipant1 > scoreParticipant2
    //   ? `${data[currIndex].match.split(" vs ")[0]} (${data[currIndex].scores[0]})`
    //   : `${data[currIndex].match.split(" vs ")[1]} (${data[currIndex].scores[1]})`;

    const round = `round${roundIndex}`; 
    const updatedRoundData = [...tournamentData[round], {
      [data[currIndex].match.split(" vs ")[0]]: data[currIndex].scores[0],
      [data[currIndex].match.split(" vs ")[1]]: data[currIndex].scores[1]
    }];
  
    setTournamentData(prevData => ({
      ...prevData,
      [round]: updatedRoundData
    })); 
    
    setMatchIndex(matchIndex+1);
    if (data.length != 1) {
      setStopFlag(true);
    }
    else{
      setStopFlag(false);
      setRoundIndex(roundIndex+1);
    }
    
    onWinnerSelection(winner, tournamentData);
    setSelectedParticipant(winner);
    deleteFixture(data[currIndex].id);
    setModalOpen(false);
  };

  const handleScoreChange = (fixtureId, participantIndex, score) => {
    setData(prevFixtures => {
      return prevFixtures.map(fixture => {
        if (fixture.id === fixtureId) {
          const updatedScores = [...fixture.scores];
          updatedScores[participantIndex] = score;
          return { ...fixture, scores: updatedScores };
        }
        return fixture;
      });
    });
  };

  const saveTournamentData = () => {
    const jsonData = JSON.stringify(tournamentData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = tournamentData["tournament_name"] + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixtures-container">    
    {matchIndex == 8 ? <h1>All mathces done</h1>: ''}
      {data.map((fixture, index) => (
        <div key={index} className="fixture">
          <p>{fixture.match}</p>
          <button className='btn' onClick={() => handleIndex(index)}>Add Scores</button>
        </div>
      ))}

      {modalOpen && (
        
        <div className="modal">
          <div className="modal-content">
            <h1>Scores</h1>
            <button className="close" onClick={() => setModalOpen(false)}>&times;</button>
            
            <label>{data[currIndex].match.split(" vs ")[0]}</label>
            <input className='input_p'
                   type="number" 
                   placeholder={data[currIndex].scores[0]} 
                   value={data[currIndex].scores[0]}
                   min={0} 
                   max={50} 
                   onChange={(e) => handleScoreChange(data[currIndex].id, 0, parseInt(e.target.value))} />  
            
            <label>{data[currIndex].match.split(" vs ")[1]}</label>
            <input className='input_p'
                   type="number" 
                   placeholder={data[currIndex].scores[1]} 
                   value={data[currIndex].scores[1]} 
                   min={0} 
                   max={50}
                   onChange={(e) => handleScoreChange(data[currIndex].id, 1, parseInt(e.target.value))} />
            
            <button className="btn" onClick={handleWinner}>Save</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default FixtureGenerator;
