// import { useState } from 'react'

import main from './assets/main.png'

import StarsIcon from '@mui/icons-material/Stars';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import PetsIcon from '@mui/icons-material/Pets';

import './App.css'

function App() {

  return (
    <>
      <div className='wrapper'>

      
    <img src={main} className="mainPhoto">
    </img>

      <h1>Выберите уровень подготовки</h1>
      
      <div className='card card1'>
        <div><PetsIcon/></div>
        <div>
          <div>Новичок</div>
          <div>sub yовичок</div>
          
        </div>
      </div>
      <div className='card card1'>
        <div><AssistantPhotoIcon/></div>
        <div>
          <div>Средний</div>
          <div>sub yовичок</div>
          
        </div>
      </div>
      
      <div className='card card1'>
        <div><StarsIcon/></div>
        <div>
          <div>Профи</div>
          <div>sub yовичок</div>
          
        </div>
      </div>

      </div>
      
    </>
  )
}

export default App
