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
import layImage1 from '../assets/lay1.jpg'
import layImage2 from '../assets/lay2.jpg'
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
    'lay1': layImage1,
    'lay2': layImage2,
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
        description1: '1. Начни в тихой комнате: присесть на метр — позови по имени + «Ко мне» радостным голосом.',
        description2: '2. Как только собака идёт и подходит — пометь + лакомство и ободряющие слова.',
        description3: '3. Повтори с увеличением расстояния до 3–5 метров.',
        description4: '4. Используй игровой подход: поощрение, игры при возвращении (летает игрушка)',
        description5: '5. Вводи поводок-репер: если не идёт, лёгкое подтягивание и сразу поощрение при отклике.',
        img1: 'come1',
        img2: 'come2'
      },
    
      'Нельзя': {
        title: 'Нельзя',
        description1: '1. Научи собаку переставать делать действие: при приближении к запрещённой вещи скажи «Фу», отвлеки лакомством и забери предмет.',
        description2: '2. Если собака прекратила — пометь и дай альтернативу (игрушку/команду «Дай»).',
        description3: '3. Повторяй, увеличивая искушение (более привлекательные предметы) под контролем.',
        description4: '4. Никогда не пугай и не бей — «Фу» должен быть предсказуемым и спокойным.',
        description5: '5. Со временем сокращай вознаграждение: похвала, затем просто смена внимания.',
        img1: 'no1',
        img2: 'no2'
      },
      
      'Место': {
        title: 'Место',
        description1: '1. Поставь коврик; заманивай собаку лакомством в угол коврика и скажи «Место», когда ступит — пометь.',
        description2: '2. Как только полностью окажется на коврике, дай лакомство и отпусти словом «Готово».',
        description3: '3. Увеличивай время нахождения на месте шагами: 5→30→120 секунд.',
        description4: '4. Вводи команду «Ждать» на месте, уходи на шаг — возвращайся с поощрением.',
        description5: '5. Усложняй: уходи дальше, добавляй людей и шумы, тренируй выдержку.',
        img1: 'no1',
        img2: 'no2'
      },

      'Рядом': {
        title: 'Рядом',
        description1: '1. Начни на короткой поводке; держи лакомство рядом с ногой, скажи «Рядом» и делай шаг — собака тянется к лакомству.',
        description2: '2. Если остаётся у ноги на 2–3 шага — пометь и награди.',
        description3: '3. Постепенно увеличивай дистанцию и снижай частоту лакомств, вводя похвалу.',
        description4: '4. Тренируй повороты, остановки, переходы с ходьбы на бег и обратно.',
        description5: '5. Добавь отвлекающие стимулы (люди, еда на земле) и закрепляй выдержку.',
        img1: 'no1',
        img2: 'no2'
      },
      
      'Лежать': {
        title: 'Лежать',
        description1: '1. Сначала дайте команду «Сидеть», затем удерживай лакомство низко и веди вниз — скажи «Лежать».',
        description2: '2. Как собака ляжет — пометь и дай лакомство, повторить 5–8 раз.',
        description3: '3. Увеличивай время лежания постепенно: 3→15→60 секунд.',
        description4: '4. Тренируй «оставаться» в лежачем положении, отходя на шаг и возвращаясь.',
        description5: '5. Добавляй отвлекающие факторы и движения рядом, корректируя возвращением к команде.',
        img1: 'lay1',
        img2: 'lay2'
      },
     
      'Аппорт': {
        title: 'Аппорт',
        description1: '1. Научи брать предмет: предложи игрушку, поощри, если схватил. Повторяй с разными предметами.',
        description2: '2. После удержания в пасти говори «Держи» → затем «Отдай» и выдавай лакомство за отдачу в руку.',
        description3: '3. Разбери цепочку: подброс → «Принеси» → поймал → «Дай» → вознаграждение.',
        description4: '4. Увеличивай расстояние: бросай дальше, поощряй возвращение к хозяину.',
        description5: '5. Тренируй отвлекание: другие игрушки вокруг, люди — собака должна принести указанный предмет.',
        img1: 'no123',
        img2: 'no123'
      },
      
      'Прыжок через барьер': {
        title: 'Прыжок через барьер',
        description1: '1. Начни с невысокой планки/руки: заманивай собаку лакомством и веди через барьер, говоря «Прыжок» перед препятствием.',
        description2: '2. Как садится и перепрыгивает — пометь и награди сразу.',
        description3: '3. Постепенно увеличивай высоту на 5–10 см, следи за техникой и безопасностью',
        description4: '4. Тренируй подход: собака должна подходить по прямой, не замедляя шаг.',
        description5: '5. Добавляй серию препятствий с небольшими интервалами для выработки ритма.',
        img1: 'no123',
        img2: 'no123'
      },
     
      'Поиск предмета': {
        title: 'Поиск предмета',
        description1: '1. Начни с одного любимого предмета: положи его на видимом месте, дай понюхать, скажи «Найди», поощри при обнаружении.',
        description2: '2. Увеличь сложность: спрячь предмет в лёгком месте и повторяй команду.',
        description3: '3. Используй запаховую последовательность: предмет → носок с запахом → прятание.',
        description4: '4. Похвалы и лакомства давай при первых касаниях носом и при доставке предмета.',
        description5: '5. Добавляй уровни сложности: другие запахи вокруг, различные комнаты, улица.',
        img1: 'no123',
        img2: 'no123'
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
          className="comandPhoto"
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