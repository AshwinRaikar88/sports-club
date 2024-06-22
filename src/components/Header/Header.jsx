import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link className='header_link' to="/"><h1 className>Tournament Wizard</h1></Link>
      {/* <Link to="/play">Play</Link> */}
      
    </header>
  );
}

export default Header;