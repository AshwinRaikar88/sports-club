import React from 'react';
import { Link } from 'react-router-dom';
import './CardTall.css'

function CardTall({title, img_name, link}) {

  return (
    <div className='CT_main'>
      <Link to={link}>
      <div className='CT_d1'>
        <img className='noise' src="./images/noise2.jpg" alt="cover" />
        <img className='img' src={`./images/${img_name}`} alt="play" />
        <h2 className='CT_title'>{title}</h2>
      </div>
      </Link>
    </div>
  );
}  

export default CardTall;