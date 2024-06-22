import React, { useState, useEffect } from 'react';
import './Fixture.css';

const FixtureGenerator = ({ fixtures, onWinnerSelection }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [data, setData] = useState(fixtures);
  const [stopUpdating, setStopFlag] = useState(false);

  const handleIndex = (index) => {
    setCurrIndex(index);
    setModalOpen(true);
  };

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
      ? `${data[currIndex].match.split(" vs ")[0]} (${data[currIndex].scores[0]})`
      : `${data[currIndex].match.split(" vs ")[1]} (${data[currIndex].scores[1]})`;
    
    if (data.length != 1) 
        setStopFlag(true);
    else
        setStopFlag(false);

    onWinnerSelection(winner);
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

  return (
    <div className="fixtures-container">      
      {data.map((fixture, index) => (
        <div key={index} className="fixture">
          <p>{fixture.match}</p>
          <button className='btn' onClick={() => handleIndex(index)}>Scores</button>
        </div>
      ))}

      {modalOpen && (
        
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setModalOpen(false)}>&times;</button>
            
            <label>{data[currIndex].match.split(" vs ")[0]} Score:</label>
            <input className='input_p'
                   type="number" 
                   placeholder={data[currIndex].scores[0]} 
                   value={data[currIndex].scores[0]}
                   min={0} 
                   max={50} 
                   onChange={(e) => handleScoreChange(data[currIndex].id, 0, parseInt(e.target.value))} />  
            
            <label>{data[currIndex].match.split(" vs ")[1]} Score:</label>
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
