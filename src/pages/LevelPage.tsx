import { useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import '../App.css'

function LevelPage() {
  const { level } = useParams<{ level: string }>()
  const navigate = useNavigate()

  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'beginner':
        return {
          title: 'Новичок',
          description: 'Изучайте основы и базовые навыки',
          commands: [
            { name: 'ls', description: 'Просмотр файлов и папок' },
            { name: 'cd', description: 'Переход между папками' },
            { name: 'pwd', description: 'Показать текущую папку' },
            { name: 'mkdir', description: 'Создание новой папки' },
            { name: 'touch', description: 'Создание нового файла' },
            { name: 'cp', description: 'Копирование файлов' }
          ]
        }
      case 'intermediate':
        return {
          title: 'Средний уровень',
          description: 'Развивайте продвинутые навыки',
          commands: [
            { name: 'grep', description: 'Поиск текста в файлах' },
            { name: 'find', description: 'Поиск файлов и папок' },
            { name: 'chmod', description: 'Изменение прав доступа' },
            { name: 'tar', description: 'Работа с архивами' },
            { name: 'ps', description: 'Просмотр процессов' },
            { name: 'kill', description: 'Завершение процессов' }
          ]
        }
      case 'professional':
        return {
          title: 'Профессионал',
          description: 'Мастерство и экспертные знания',
          commands: [
            { name: 'awk', description: 'Обработка текстовых данных' },
            { name: 'sed', description: 'Редактирование потока данных' },
            { name: 'cron', description: 'Планировщик задач' },
            { name: 'rsync', description: 'Синхронизация файлов' },
            { name: 'ssh', description: 'Удаленное подключение' },
            { name: 'docker', description: 'Контейнеризация приложений' }
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
    <div className='wrapper'>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ alignSelf: 'flex-start', mb: 2 }}
      >
        Назад
      </Button>

      <h1>{levelInfo.title}</h1>
      <p>{levelInfo.description}</p>

      <div style={{ marginTop: '2rem', width: '100%' }}>
        <h3>Команды для изучения:</h3>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {levelInfo.commands.map((command, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleCommandClick(command.name)}
                sx={{
                  height: '80px',
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
                <div style={{ fontSize: '0.8em', marginTop: '4px' }}>
                  {command.description}
                </div>
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default LevelPage