import { useMemo } from 'preact/hooks';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

type UpcomingTasksProps = {
  tasks: TaskType[];
};

const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  const sortedTasks = useMemo(() => {
    return tasks
      .filter((task) => task.deadline)
      .sort((a, b) => (a.deadline && b.deadline ? +new Date(a.deadline) - +new Date(b.deadline) : 0));
  }, [tasks]);
  return (
    <Paper sx={{ padding: 2, marginTop: 2, width: '95%' }}>
      {/* Title of the Upcoming Tasks section */}
      <Typography variant="h6" gutterBottom>
        Upcoming Tasks
      </Typography>

      {/* Display message when no upcoming tasks are found */}
      {sortedTasks.length === 0 ? (
        <Typography variant="body2">No upcoming tasks.</Typography>
      ) : (
        // Render list of tasks with their deadlines
        <List>
          {sortedTasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.title}
                secondary={`Deadline: ${new Date(task.deadline!).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UpcomingTasks;
