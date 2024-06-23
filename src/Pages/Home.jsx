import React from 'react';
import '../Styles/Home.css'

import CardTall from '../components/Cards/CardTall.jsx';

function Home() {

  return (
    <div>
        <div className='home_area'>
            <CardTall title='NEW TOURNAMENT' img_name='play.jpg' link='/play'/>
            <CardTall title='REGISTER PLAYERS' img_name='add_participants.jpg' link='/register'/>
            <CardTall title='MATCHES' img_name='match.jpg' link='/match_history'/>
        </div>
    </div>
  );
}  

export default Home;