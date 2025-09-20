import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import main from '../assets/main.png'

import StarsIcon from '@mui/icons-material/Stars';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import PetsIcon from '@mui/icons-material/Pets';

import '../App.css'

function HomePage() {
  const navigate = useNavigate()

  const handleLevelSelect = (level: string) => {
    navigate(`/level/${level}`)
  }

  return (
    <div className='wrapper'>
      <img src={main} className="mainPhoto" alt="Main" />
      <h1>Выберите уровень подготовки</h1>

      <div className='card card1' onClick={() => handleLevelSelect('beginner')}>
        <div><PetsIcon/></div>
        <div>
          <div>Новичок</div>
          <div>Базовые навыки</div>
        </div>
      </div>

      <div className='card card1' onClick={() => handleLevelSelect('intermediate')}>
        <div><AssistantPhotoIcon/></div>
        <div>
          <div>Средний</div>
          <div>Продвинутые навыки</div>
        </div>
      </div>

      <div className='card card1' onClick={() => handleLevelSelect('professional')}>
        <div><StarsIcon/></div>
        <div>
          <div>Профи</div>
          <div>Экспертный уровень</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage