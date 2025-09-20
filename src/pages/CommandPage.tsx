import { useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import '../App.css'

function CommandPage() {
  const { level, command } = useParams<{ level: string; command: string }>()
  const navigate = useNavigate()

  const getCommandInfo = (commandName: string) => {
    const commands: { [key: string]: any } = {
      // Beginner commands
      'ls': {
        title: 'ls - Просмотр файлов и папок',
        description: 'Команда ls используется для просмотра содержимого директории',
        syntax: 'ls [опции] [путь]',
        examples: [
          { code: 'ls', description: 'Показать файлы в текущей папке' },
          { code: 'ls -l', description: 'Подробный список с правами доступа' },
          { code: 'ls -la', description: 'Показать все файлы, включая скрытые' },
          { code: 'ls /home', description: 'Показать содержимое папки /home' }
        ],
        tips: [
          'Используйте -l для подробной информации',
          'Опция -a показывает скрытые файлы',
          'Можно комбинировать опции: ls -la'
        ]
      },
      'cd': {
        title: 'cd - Переход между папками',
        description: 'Команда cd (change directory) используется для перехода между директориями',
        syntax: 'cd [путь]',
        examples: [
          { code: 'cd /home', description: 'Перейти в папку /home' },
          { code: 'cd ..', description: 'Перейти в родительскую папку' },
          { code: 'cd ~', description: 'Перейти в домашнюю папку' },
          { code: 'cd -', description: 'Вернуться в предыдущую папку' }
        ],
        tips: [
          'cd без параметров переводит в домашнюю папку',
          'Используйте Tab для автодополнения путей',
          'cd - возвращает в предыдущую директорию'
        ]
      },
      'pwd': {
        title: 'pwd - Показать текущую папку',
        description: 'Команда pwd (print working directory) показывает полный путь к текущей директории',
        syntax: 'pwd',
        examples: [
          { code: 'pwd', description: 'Показать текущий путь' }
        ],
        tips: [
          'Полезно для ориентации в файловой системе',
          'Результат всегда показывает абсолютный путь'
        ]
      },
      'mkdir': {
        title: 'mkdir - Создание новой папки',
        description: 'Команда mkdir (make directory) создает новые директории',
        syntax: 'mkdir [опции] имя_папки',
        examples: [
          { code: 'mkdir new_folder', description: 'Создать папку new_folder' },
          { code: 'mkdir -p path/to/folder', description: 'Создать вложенные папки' },
          { code: 'mkdir folder1 folder2', description: 'Создать несколько папок' }
        ],
        tips: [
          'Используйте -p для создания вложенных папок',
          'Можно создать несколько папок одной командой'
        ]
      },
      'touch': {
        title: 'touch - Создание нового файла',
        description: 'Команда touch создает пустой файл или обновляет время модификации существующего',
        syntax: 'touch имя_файла',
        examples: [
          { code: 'touch file.txt', description: 'Создать файл file.txt' },
          { code: 'touch file1.txt file2.txt', description: 'Создать несколько файлов' }
        ],
        tips: [
          'Если файл существует, обновляется время модификации',
          'Можно создать несколько файлов одной командой'
        ]
      },
      'cp': {
        title: 'cp - Копирование файлов',
        description: 'Команда cp (copy) копирует файлы и директории',
        syntax: 'cp [опции] источник назначение',
        examples: [
          { code: 'cp file.txt copy.txt', description: 'Скопировать файл' },
          { code: 'cp -r folder/ backup/', description: 'Скопировать папку рекурсивно' },
          { code: 'cp *.txt backup/', description: 'Скопировать все .txt файлы' }
        ],
        tips: [
          'Используйте -r для копирования папок',
          'Можно использовать маски файлов (*)'
        ]
      },
      // Intermediate commands
      'grep': {
        title: 'grep - Поиск текста в файлах',
        description: 'Команда grep ищет строки, соответствующие заданному шаблону',
        syntax: 'grep [опции] шаблон [файл]',
        examples: [
          { code: 'grep "hello" file.txt', description: 'Найти строки со словом "hello"' },
          { code: 'grep -i "hello" file.txt', description: 'Поиск без учета регистра' },
          { code: 'grep -r "pattern" /path/', description: 'Рекурсивный поиск в папке' },
          { code: 'grep -n "error" log.txt', description: 'Показать номера строк' }
        ],
        tips: [
          'Используйте -i для поиска без учета регистра',
          'Опция -r ищет рекурсивно в подпапках',
          'Опция -n показывает номера строк'
        ]
      },
      'find': {
        title: 'find - Поиск файлов и папок',
        description: 'Команда find ищет файлы и директории по различным критериям',
        syntax: 'find [путь] [критерии]',
        examples: [
          { code: 'find . -name "*.txt"', description: 'Найти все .txt файлы' },
          { code: 'find /home -type d', description: 'Найти только папки' },
          { code: 'find . -size +100M', description: 'Найти файлы больше 100MB' },
          { code: 'find . -mtime -7', description: 'Файлы, измененные за последние 7 дней' }
        ],
        tips: [
          'Используйте -name для поиска по имени',
          'Опция -type позволяет искать файлы (f) или папки (d)',
          'Можно комбинировать несколько критериев'
        ]
      },
      'chmod': {
        title: 'chmod - Изменение прав доступа',
        description: 'Команда chmod изменяет права доступа к файлам и папкам',
        syntax: 'chmod [права] файл',
        examples: [
          { code: 'chmod 755 script.sh', description: 'Дать права на выполнение' },
          { code: 'chmod +x file', description: 'Добавить право на выполнение' },
          { code: 'chmod -w file', description: 'Убрать право на запись' },
          { code: 'chmod 644 *.txt', description: 'Установить права для всех .txt' }
        ],
        tips: [
          '755 = rwxr-xr-x (владелец: все права, остальные: чтение и выполнение)',
          '644 = rw-r--r-- (владелец: чтение/запись, остальные: только чтение)',
          'Используйте + или - для добавления/удаления прав'
        ]
      },
      'tar': {
        title: 'tar - Работа с архивами',
        description: 'Команда tar создает и извлекает архивы файлов',
        syntax: 'tar [опции] архив файлы',
        examples: [
          { code: 'tar -czf archive.tar.gz folder/', description: 'Создать сжатый архив' },
          { code: 'tar -xzf archive.tar.gz', description: 'Извлечь сжатый архив' },
          { code: 'tar -tzf archive.tar.gz', description: 'Посмотреть содержимое архива' },
          { code: 'tar -xzf archive.tar.gz -C /path/', description: 'Извлечь в определенную папку' }
        ],
        tips: [
          'c = создать, x = извлечь, t = просмотр',
          'z = сжатие gzip, f = файл архива',
          'Используйте -C для указания папки назначения'
        ]
      },
      'ps': {
        title: 'ps - Просмотр процессов',
        description: 'Команда ps показывает информацию о запущенных процессах',
        syntax: 'ps [опции]',
        examples: [
          { code: 'ps', description: 'Показать процессы текущего пользователя' },
          { code: 'ps aux', description: 'Показать все процессы подробно' },
          { code: 'ps -ef', description: 'Полный список процессов' },
          { code: 'ps aux | grep nginx', description: 'Найти процессы nginx' }
        ],
        tips: [
          'aux - самый информативный вариант',
          'Можно комбинировать с grep для поиска',
          'PID - идентификатор процесса для управления'
        ]
      },
      'kill': {
        title: 'kill - Завершение процессов',
        description: 'Команда kill завершает процессы по их PID',
        syntax: 'kill [сигнал] PID',
        examples: [
          { code: 'kill 1234', description: 'Завершить процесс с PID 1234' },
          { code: 'kill -9 1234', description: 'Принудительно завершить процесс' },
          { code: 'killall firefox', description: 'Завершить все процессы firefox' },
          { code: 'pkill -f "script.py"', description: 'Завершить процессы по имени' }
        ],
        tips: [
          'Сигнал -9 (SIGKILL) завершает принудительно',
          'killall завершает по имени процесса',
          'Будьте осторожны с системными процессами'
        ]
      },
      // Professional commands
      'awk': {
        title: 'awk - Обработка текстовых данных',
        description: 'AWK - мощный язык для обработки структурированных текстовых данных',
        syntax: 'awk \'программа\' [файл]',
        examples: [
          { code: 'awk \'{print $1}\' file.txt', description: 'Вывести первый столбец' },
          { code: 'awk -F: \'{print $1,$3}\' /etc/passwd', description: 'Указать разделитель' },
          { code: 'awk \'$3 > 1000\' file.txt', description: 'Фильтр по условию' },
          { code: 'awk \'{sum+=$2} END {print sum}\' data.txt', description: 'Подсчет суммы' }
        ],
        tips: [
          '$1, $2... - ссылки на столбцы',
          'NR - номер строки, NF - количество полей',
          'BEGIN и END - специальные блоки'
        ]
      },
      'sed': {
        title: 'sed - Редактирование потока данных',
        description: 'sed - потоковый редактор для фильтрации и преобразования текста',
        syntax: 'sed \'команда\' [файл]',
        examples: [
          { code: 'sed \'s/old/new/g\' file.txt', description: 'Заменить все вхождения' },
          { code: 'sed -n \'1,5p\' file.txt', description: 'Вывести строки 1-5' },
          { code: 'sed \'/pattern/d\' file.txt', description: 'Удалить строки с паттерном' },
          { code: 'sed -i \'s/old/new/g\' file.txt', description: 'Изменить файл напрямую' }
        ],
        tips: [
          's/old/new/g - замена всех вхождений',
          '-i изменяет файл на месте',
          'p - печать, d - удаление'
        ]
      },
      'cron': {
        title: 'cron - Планировщик задач',
        description: 'Cron позволяет автоматически выполнять команды по расписанию',
        syntax: 'crontab [опции]',
        examples: [
          { code: 'crontab -e', description: 'Редактировать расписание' },
          { code: 'crontab -l', description: 'Посмотреть текущие задачи' },
          { code: '0 2 * * * /path/script.sh', description: 'Запуск каждый день в 2:00' },
          { code: '*/5 * * * * command', description: 'Запуск каждые 5 минут' }
        ],
        tips: [
          'Формат: минута час день месяц день_недели команда',
          '* означает "любое значение"',
          'Используйте crontab -e для безопасного редактирования'
        ]
      },
      'rsync': {
        title: 'rsync - Синхронизация файлов',
        description: 'rsync эффективно синхронизирует файлы и папки локально или удаленно',
        syntax: 'rsync [опции] источник назначение',
        examples: [
          { code: 'rsync -av source/ dest/', description: 'Синхронизация с сохранением атрибутов' },
          { code: 'rsync -av --delete src/ dest/', description: 'Удалить лишние файлы в назначении' },
          { code: 'rsync -av user@host:/path/ local/', description: 'Синхронизация с удаленного сервера' },
          { code: 'rsync -av --exclude="*.tmp" src/ dest/', description: 'Исключить определенные файлы' }
        ],
        tips: [
          '-a сохраняет права, время и структуру',
          '-v для подробного вывода',
          '--delete удаляет файлы, отсутствующие в источнике'
        ]
      },
      'ssh': {
        title: 'ssh - Удаленное подключение',
        description: 'SSH обеспечивает безопасное подключение к удаленным серверам',
        syntax: 'ssh [опции] пользователь@хост',
        examples: [
          { code: 'ssh user@server.com', description: 'Подключиться к серверу' },
          { code: 'ssh -p 2222 user@server.com', description: 'Подключение через другой порт' },
          { code: 'ssh -i ~/.ssh/key user@server.com', description: 'Использовать определенный ключ' },
          { code: 'ssh user@server "ls -la"', description: 'Выполнить команду удаленно' }
        ],
        tips: [
          'Используйте ключи SSH вместо паролей',
          'ssh-keygen создает пару ключей',
          'ssh-copy-id копирует ключ на сервер'
        ]
      },
      'docker': {
        title: 'docker - Контейнеризация приложений',
        description: 'Docker позволяет упаковывать приложения в легкие переносимые контейнеры',
        syntax: 'docker [команда] [опции]',
        examples: [
          { code: 'docker run hello-world', description: 'Запустить тестовый контейнер' },
          { code: 'docker ps', description: 'Посмотреть запущенные контейнеры' },
          { code: 'docker build -t myapp .', description: 'Собрать образ из Dockerfile' },
          { code: 'docker exec -it container_id bash', description: 'Войти в контейнер' }
        ],
        tips: [
          'docker ps -a показывает все контейнеры',
          'docker images список всех образов',
          'Используйте -d для запуска в фоне'
        ]
      }
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
    <div className='wrapper' style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/level/${level}`)}
        sx={{ alignSelf: 'flex-start', mb: 2 }}
      >
        Назад к уровню
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {commandInfo.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {commandInfo.description}
      </Typography>

      {commandInfo.syntax && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Синтаксис:
          </Typography>
          <Typography variant="body2" component="code" sx={{ fontFamily: 'monospace' }}>
            {commandInfo.syntax}
          </Typography>
        </Paper>
      )}

      {commandInfo.examples && commandInfo.examples.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Примеры использования:
          </Typography>
          {commandInfo.examples.map((example, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: '#f8f8f8' }}>
              <Typography variant="body2" component="code" sx={{
                fontFamily: 'monospace',
                backgroundColor: '#e0e0e0',
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'block',
                mb: 1
              }}>
                {example.code}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {example.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      {commandInfo.tips && commandInfo.tips.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Полезные советы:
          </Typography>
          <ul>
            {commandInfo.tips.map((tip, index) => (
              <li key={index}>
                <Typography variant="body2">
                  {tip}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  )
}

export default CommandPage