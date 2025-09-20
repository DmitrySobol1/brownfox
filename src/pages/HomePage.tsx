import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import main from '../assets/main.png'
// import main2 from '../assets/main2.png'

// import StarsIcon from '@mui/icons-material/Stars';
// import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
// import PetsIcon from '@mui/icons-material/Pets';

import '../App.css'
import Typography from '@mui/material/Typography'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { ProgressModal } from '../components/ProgressModal'
import Chip from '@mui/material/Chip'

function HomePage() {
  const navigate = useNavigate()
  const [progressModalOpen, setProgressModalOpen] = useState(false)

  const handleLevelSelect = (level: string) => {
    navigate(`/level/${level}`)
  }

  const handleOpenProgress = () => {
    setProgressModalOpen(true)
  }

  const handleCloseProgress = () => {
    setProgressModalOpen(false)
  }

  return (
    <div className='wrapper'>
      

        <img src={main} className="mainPhoto" alt="Main" />



        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Chip
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px'  }}>
                <TrendingUpIcon sx={{ fontSize: '16px' }} />
                мой прогресс
              </div>
            }
            color='primary'
            onClick={handleOpenProgress}
            sx={{
              mb:4,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              }
            }}
          />
        </div>

      <Typography variant="h5" component="h4" gutterBottom sx={{ textAlign: 'left', mb:4 }}>
        Выберите уровень :
      </Typography>

      <div className='card card1' onClick={() => handleLevelSelect('beginner')}>
        {/* <div className='icon'><PetsIcon fontSize='large' /></div> */}
        <div className='wrapperText'>
          <div className='boldText'>
            <Typography variant="button" sx={{ mb: 0 }}>
              Новичок
            </Typography>
            </div>
          <div>
            
            <Typography variant="body1" sx={{ mb: 0 }}>
              базовые навыки
            </Typography>
            </div>
        </div>
      </div>

     

      <div className='card card2' onClick={() => handleLevelSelect('intermediate')}>
        {/* <div className='icon'><AssistantPhotoIcon fontSize='large'/></div> */}
        <div  className='wrapperText'>
          <div className='boldText'>
            <Typography variant="button" sx={{ mb: 0 }}>
              Средний
            </Typography>
            </div>
          <div >
            <Typography variant="body1" sx={{ mb: 0 }}>
              продвинутые навыки
            </Typography>

          </div>
        </div>
      </div>

      <div className='card card3' onClick={() => handleLevelSelect('professional')}>
        {/* <div className='icon'><StarsIcon fontSize='large'/></div> */}
        <div  className='wrapperText'>
          <div className='boldText'>
            <Typography variant="button" sx={{ mb: 0 }}>
              Профи
            </Typography>
          </div>
          <div>
            <Typography variant="body1" sx={{ mb: 0 }}>
              экспертный уровень
            </Typography>
            </div>
        </div>
      </div>

    

      {/* Progress Modal */}
      <ProgressModal
        open={progressModalOpen}
        onClose={handleCloseProgress}
      />

      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '0',
        right: '0',
        textAlign: 'center',
        zIndex: 1000
      }}>
        <Typography variant="caption" gutterBottom sx={{ display: 'block', textAlign: 'center' }}>
           Сделано любителями собак ❤️ для любителей собак
        </Typography>
      </div>
    </div>
  )
}

export default HomePage