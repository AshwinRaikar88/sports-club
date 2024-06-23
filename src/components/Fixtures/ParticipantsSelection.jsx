// ParticipantSelection.js
import React from 'react';
import './Participants.css'

function ParticipantSelection({ participants, selectedParticipants, onSelection }) {
  const handleSelection = (participant) => {
    onSelection(participant);
  };

  return (
    <div className='p_main'>

      <div className='p_container'>    
        <h2>Participants</h2>
        <span className='h3_line'></span>
        <div className='p_items'>
          <ul>
            {participants.map((participant) => (
              <li className='list_p' key={participant.id}>{participant.name}</li>
            ))}
          </ul>
        </div>    
      </div>
      
      {/* Manual selection logic
      <div className='p_container'>
        <h3>Select Participants:</h3>
        <span className='h3_line'> </span>
        <ul>
          {participants.map((participant) => (
            <li className='list' key={participant.id}>
              <button className='p_btn' onClick={() => handleSelection(participant)}>
                {participant.name}
              </button>
            </li> 
          ))}
        </ul>
      </div> 
      
      <div className='p_container'>    
        <h3>Selected players</h3>
          <span className='h3_line'></span>
        <div className='p_items'>
          <ul>
            {selectedParticipants.map((participant) => (
              <li className='list_p' key={participant.id}>{participant.name}</li>
            ))}
          </ul>
        </div>    
      </div> */}

    </div>
  );
}

export default ParticipantSelection;
