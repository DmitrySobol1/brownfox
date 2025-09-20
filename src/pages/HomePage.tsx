import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import main from '../assets/main.png'
// import main2 from '../assets/main2.png'

// import StarsIcon from '@mui/icons-material/Stars';
// import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
// import PetsIcon from '@mui/icons-material/Pets';

import '../App.css'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { ProgressModal } from '../components/ProgressModal'

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


      {/* <h2 className='titleText'>Выберите уровень подготовки:</h2> */}

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

      {/* Progress Button */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<TrendingUpIcon />}
        onClick={handleOpenProgress}
        sx={{
          mt: 4,
          mb: 8,
          py: 1.5,
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1.1rem',
          borderColor: '#2196f3',
          color: '#2196f3',
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
          },
        }}
      >
        📊 Мой прогресс
      </Button>

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