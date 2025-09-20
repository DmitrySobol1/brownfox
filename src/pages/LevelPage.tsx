import { useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import '../App.css'
import Typography from '@mui/material/Typography'

function LevelPage() {
  const { level } = useParams<{ level: string }>()
  const navigate = useNavigate()

  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'beginner':
        return {
          title: 'Уровень новичок',
          description: 'Изучайте основы и базовые навыки',
          commands: [
            { name: 'Сидеть', description: 'Просмотр файлов и папок' },
            { name: 'Ко мне', description: 'Переход между папками' },
            { name: 'Нельзя', description: 'Показать текущую папку' },
            // { name: 'mkdir', description: 'Создание новой папки' },
            // { name: 'touch', description: 'Создание нового файла' },
            // { name: 'cp', description: 'Копирование файлов' }
          ]
        }
      case 'intermediate':
        return {
          title: 'Средний уровень',
          description: 'Развивайте продвинутые навыки',
          commands: [
            { name: 'Место', description: 'Поиск текста в файлах' },
            { name: 'Рядом', description: 'Поиск файлов и папок' },
            { name: 'Лежать', description: 'Изменение прав доступа' },
            // { name: 'tar', description: 'Работа с архивами' },
            // { name: 'ps', description: 'Просмотр процессов' },
            // { name: 'kill', description: 'Завершение процессов' }
          ]
        }
      case 'professional':
        return {
          title: 'Профессионал',
          description: 'Мастерство и экспертные знания',
          commands: [
            { name: 'Аппорт', description: 'Обработка текстовых данных' },
            { name: 'Прыжок через барьер', description: 'Редактирование потока данных' },
            { name: 'Поиск предмета', description: 'Планировщик задач' },
            // { name: 'rsync', description: 'Синхронизация файлов' },
            // { name: 'ssh', description: 'Удаленное подключение' },
            // { name: 'docker', description: 'Контейнеризация приложений' }
          ]
        }
      default:
        return {
          title: 'Неизвестный уровень',
          description: 'Уровень не найден',
          commands: []
        }
    }
  }

  const levelInfo = getLevelInfo(level || '')

  const handleCommandClick = (commandName: string) => {
    navigate(`/level/${level}/command/${commandName}`)
  }

  return (
    <div className='wrapperLevel'>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ alignSelf: 'flex-start', mb: 6 }}
      >
        Назад
      </Button>

      <Typography variant="h5" component="h4" gutterBottom>
        {levelInfo.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {levelInfo.description}
      </Typography>

      {/* <h2>{levelInfo.title}</h2> */}
      {/* <p>{levelInfo.description}</p> */}

      <div style={{ marginTop: '3rem', width: '100%' }}>
        {/* <h3>Выберите команду для изучения:</h3> */}

      <Typography variant="h6" component="h4" gutterBottom>
        Выберите команду для изучения:
      </Typography>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          {levelInfo.commands.map((command, index) => (
            <div key={index}>
              <Button
                // variant="outlined"
                style={{backgroundColor:'#ffead2', color: 'black'}}
                fullWidth
                onClick={() => handleCommandClick(command.name)}
                sx={{
                  height: '50px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textTransform: 'none'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                  {command.name}
                </div>
                
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LevelPage