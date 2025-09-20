import { useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
// import Paper from '@mui/material/Paper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import '../App.css'

// Импорт всех изображений
import sitImage1 from '../assets/sit1.jpg'
import sitImage2 from '../assets/sit2.jpg'
import comeImage1 from '../assets/come1.jpg'
import comeImage2 from '../assets/come2.jpg'
import noImage1 from '../assets/no1.jpg'
import noImage2 from '../assets/no2.jpg'
import mainImage from '../assets/main.png'


function CommandPage() {
  const { level, command } = useParams<{ level: string; command: string }>()
  const navigate = useNavigate()

  // Маппинг изображений
  const imageMap1: { [key: string]: string } = {
    'sit1': sitImage1,
    'sit2': sitImage2,
    'come1': comeImage1,
    'come2': comeImage2,
    'no1': noImage1,
    'no2': noImage2,
    'main': mainImage
  }
  

  const getCommandInfo = (commandName: string) => {
    const commands: { [key: string]: any } = {
      // Beginner commands
      'Сидеть': {
        title: 'Сидеть',
        description1: '1. Встань перед собакой с лакомством в руке, опусти руку над её носом — естественно заведёт голову назад.',
        description2: '2. Когда собака сядет, сразу пометь («хорошо»/клик) и дай лакомство.',
        description3: '3. Повтори 5–8 раз в коротких сессиях по 3–5 минут.',
        description4: '4. Добавь голосовую команду «Сидеть» перед движением руки.',
        description5: '5. Уменьши подсказку рукой, повторяй с задержкой между командой и вознаграждением.',
        img1: 'sit1',
        img2: 'sit2'
      },
      
      'Ко мне': {
        title: 'Ко мне',
        description1: '1. Встань перед собакой с лакомством в руке, опусти руку над её носом — естественно заведёт голову назад.',
        description2: '2. Когда собака сядет, сразу пометь («хорошо»/клик) и дай лакомство.',
        description3: '3. Повтори 5–8 раз в коротких сессиях по 3–5 минут.',
        description4: '4. Добавь голосовую команду «Сидеть» перед движением руки.',
        description5: '5. Уменьши подсказку рукой, повторяй с задержкой между командой и вознаграждением.',
        img1: 'come1',
        img2: 'come2'
      },
    
      'Нельзя': {
        title: 'Нельзя',
        description1: '1. Встань перед собакой с лакомством в руке, опусти руку над её носом — естественно заведёт голову назад.',
        description2: '2. Когда собака сядет, сразу пометь («хорошо»/клик) и дай лакомство.',
        description3: '3. Повтори 5–8 раз в коротких сессиях по 3–5 минут.',
        description4: '4. Добавь голосовую команду «Сидеть» перед движением руки.',
        description5: '5. Уменьши подсказку рукой, повторяй с задержкой между командой и вознаграждением.',
        img1: 'no1',
        img2: 'no2'
      },
      
      
    }

    return commands[commandName] || {
      title: `${commandName} - Команда не найдена`,
      description: 'Информация об этой команде пока недоступна',
      syntax: '',
      examples: [],
      tips: []
    }
  }

  const commandInfo = getCommandInfo(command || '')

  return (
    <div className='wrapperLevel' style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/level/${level}`)}
        sx={{ alignSelf: 'flex-start', mb: 4 }}
      >
        Назад 
      </Button>

      <Typography variant="h5" component="h4" gutterBottom>
        {commandInfo.title}
      </Typography>


      <Typography variant="body1" sx={{ mb: 3 }}>
        {commandInfo.description1}
      </Typography>
      
      {commandInfo.img1 && (
        <img
          src={imageMap1[commandInfo.img1] || mainImage}
          className="comandPhoto"
          alt={commandInfo.title}
        />
      )}

      <Typography variant="body1" sx={{ mb: 3 }}>
        {commandInfo.description2}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        {commandInfo.description3}
      </Typography>

      {commandInfo.img1 && (
        <img
          src={imageMap1[commandInfo.img2] || mainImage}
          className="mainPhoto"
          alt={commandInfo.title}
        />
      )}
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        {commandInfo.description4}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        {commandInfo.description5}
      </Typography>

    
    </div>
  )
}

export default CommandPage