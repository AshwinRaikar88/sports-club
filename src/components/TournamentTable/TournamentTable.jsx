import React from 'react';
import './TournamentTable.css';

const TournamentTable = ({ tournamentData }) => {
  return (
    <div className="tournament-table">
      <h1>{tournamentData.tournament_name}</h1>

      {Object.keys(tournamentData).map((round, index) => {
        if (round !== 'tournament_name') {
          return (
            <div key={index} className="round-section">
              {/* <h2>{round.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2> */}
              {round.replace(/([a-z])([A-Z])/g, '$1 $2') === 'round1'?<h1>Round 1</h1>: ''}
              {round.replace(/([a-z])([A-Z])/g, '$1 $2') === 'round2'?<h1>Semi-finals</h1>: ''}
              {round.replace(/([a-z])([A-Z])/g, '$1 $2') === 'round3'?<h1>Final</h1>: ''}
              <table>
                <thead>
                  <tr>
                    <th>Participant 1</th>
                    <th>Scores</th>
                    <th>Participant 2</th>
                    <th>Scores</th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentData[round].map((match, idx) => (
                    <tr key={idx}>
                      <td>{Object.keys(match)[0]}</td>
                      <td>{Object.values(match)[0]}</td>
                      <td>{Object.keys(match)[1] || '-'}</td>
                      <td>{Object.values(match)[1] || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TournamentTable;
