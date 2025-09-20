// Progress toggle component for command pages

import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useProgress } from '../hooks/useProgress';

interface ProgressToggleProps {
  level: string;
  command: string;
  sx?: object;
}

export function ProgressToggle({ level, command, sx }: ProgressToggleProps) {
  const { isCompleted, toggleProgress, isLoading } = useProgress();

  const completed = isCompleted(level, command);

  const handleToggle = async () => {
    if (isLoading) return;
    await toggleProgress(level, command);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
        mb: 4,
        ...sx
      }}
    >
      <FormControlLabel
        control={
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={completed}
              onChange={handleToggle}
              disabled={isLoading}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#4caf50',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.08)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#4caf50',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: completed ? '#4caf50' : undefined,
                },
              }}
            />
            {isLoading && (
              <CircularProgress
                size={20}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-10px',
                  marginTop: '-10px',
                }}
              />
            )}
          </Box>
        }
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {completed && (
              <CheckCircleIcon
                sx={{
                  color: '#4caf50',
                  fontSize: '1.2rem',
                }}
              />
            )}
            <Typography
              variant="body1"
              sx={{
                color: completed ? '#4caf50' : 'text.secondary',
                fontWeight: completed ? 'bold' : 'normal',
                transition: 'color 0.2s ease-in-out',
              }}
            >
              {completed ? 'Команда изучена' : 'Команда не изучена'}
            </Typography>
          </Box>
        }
        sx={{
          margin: 0,
          '& .MuiFormControlLabel-label': {
            ml: 1,
          },
        }}
      />
    </Box>
  );
}