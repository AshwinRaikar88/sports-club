import React, { useState, useEffect } from 'react';
import TournamentTable from '../components/TournamentTable/TournamentTable.jsx';
import FileUpload from '../components/DragDrop/FileUpload.jsx';


import '../Styles/MatchHistory.css';


function MatchHistory() {
  const [tournamentData, setTournamentData] = useState({});
  
  // const handleUpload = async (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  
  //   reader.onload = async (e) => {
  //     try {
  //       const jsonData = JSON.parse(e.target.result);
  //       setTournamentData(jsonData);
  //     } catch (error) {
  //       console.error('Error parsing uploaded file:', error);
  //     }
  //   };
  
  //   reader.readAsText(file);
  // };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setTournamentData(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  };

  return (
    <div>
        <div className='history_area'>
        <FileUpload handleUpload={handleUpload} />  
        <TournamentTable tournamentData={tournamentData} />
        {/* {tournamentData && <pre>{JSON.stringify(tournamentData, null, 2)}</pre>} */}
        </div>
    </div>
  );
}  

export default MatchHistory;