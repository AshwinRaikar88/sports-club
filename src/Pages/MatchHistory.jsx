import React from 'react';
import '../Styles/MatchHistory.css'

import CardTall from '../components/Cards/CardTall.jsx';

function MatchHistory() {

  return (
    <div>
        <div className='main_area'>
            <CardTall title='PLAY GAME' img_name='play.jpg' link='/play'/>
            <CardTall title='REGISTER' img_name='add_participants.jpg' link='/register'/>
            <CardTall title='MATCHES' img_name='match.jpg' link='/match_history'/>
        </div>
    </div>
  );
}  

export default MatchHistory;