// Progress overview modal component

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Divider,
  IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProgress } from '../hooks/useProgress';
import { LEVEL_DISPLAY_NAMES } from '../types/progress';

interface ProgressModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProgressModal({ open, onClose }: ProgressModalProps) {
  const { getOverallStats, clearAllProgress, isLoading } = useProgress();

  const stats = getOverallStats();

  const handleClearProgress = async () => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите очистить весь прогресс? Это действие нельзя отменить.'
    );

    if (confirmed) {
      await clearAllProgress();
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return '#4caf50'; // Green
    if (percentage >= 50) return '#ff9800';  // Orange
    return '#2196f3'; // Blue
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div">
            📊 Прогресс обучения
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Overall Statistics */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Общий прогресс
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {stats.completedCommands} из {stats.totalCommands} команд изучено
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: getProgressColor(stats.overallPercentage)
              }}
            >
              {stats.overallPercentage}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stats.overallPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getProgressColor(stats.overallPercentage),
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Progress by Level */}
        {stats.levelStats.map((levelData) => (
          <Box key={levelData.level} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {LEVEL_DISPLAY_NAMES[levelData.level]}
            </Typography>

            {/* Level Progress Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ mr: 2, minWidth: '100px' }}>
                {levelData.completedCount}/{levelData.totalCount} команд
              </Typography>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={levelData.percentage}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getProgressColor(levelData.percentage),
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: getProgressColor(levelData.percentage),
                  minWidth: '40px'
                }}
              >
                {levelData.percentage}%
              </Typography>
            </Box>

            {/* Commands List */}
            <List dense sx={{ pl: 2 }}>
              {levelData.commands.map((command) => (
                <ListItem key={command.name} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    {command.completed ? (
                      <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: '#9e9e9e', fontSize: '1.2rem' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={command.name}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                        color: command.completed ? '#4caf50' : 'text.secondary',
                        fontWeight: command.completed ? 'bold' : 'normal',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleClearProgress}
          disabled={isLoading || stats.completedCommands === 0}
          color="error"
          variant="outlined"
        >
          Очистить прогресс
        </Button>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}