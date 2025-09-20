import { useNavigate } from 'react-router-dom'

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
      <h2 className='titleText'>Выберите уровень подготовки:</h2>

      <div className='card card1' onClick={() => handleLevelSelect('beginner')}>
        <div className='icon'><PetsIcon fontSize='large' /></div>
        <div className='wrapperText'>
          <div className='boldText'>Новичок</div>
          <div>Базовые навыки</div>
        </div>
      </div>

      <div className='card card2' onClick={() => handleLevelSelect('intermediate')}>
        <div className='icon'><AssistantPhotoIcon fontSize='large'/></div>
        <div  className='wrapperText'>
          <div className='boldText'>Средний</div>
          <div >Продвинутые навыки</div>
        </div>
      </div>

      <div className='card card3' onClick={() => handleLevelSelect('professional')}>
        <div className='icon'><StarsIcon fontSize='large'/></div>
        <div  className='wrapperText'>
          <div className='boldText'>Профи</div>
          <div>Экспертный уровень</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage