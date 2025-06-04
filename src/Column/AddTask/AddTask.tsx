import { useState, useRef, useEffect } from 'preact/hooks';
import { TextField, Button } from '@mui/material';

type AddTaskProps = {
  onAddTask: (taskTitle: string) => void;
};

/**
 * Component for adding a new task.
 * When "adding" mode is active, a text input for the task title is shown.
 * After adding the task, the title is sent to the `onAddTask` function from the parent component.
 * Automatically focuses the input field when in "adding" mode.
 */
const AddTask = ({ onAddTask }: AddTaskProps) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const taskInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Focus the input field when "adding" mode is active
   */
  useEffect(() => {
    if (isAdding && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [isAdding]);

  /**
   * Handle the addition of the task
   */
  const handleAddTask = () => {
    if (taskTitle.trim() === '') return;

    onAddTask(taskTitle.trim());
    setTaskTitle('');
    setIsAdding(false);
  };
  /**
   * Render input field and buttons based on "adding" mode
   */
  return isAdding ? (
    <div>
      {/* Text input for entering a new task */}
      <TextField
        ref={taskInputRef}
        label="New Task"
        variant="outlined"
        size="small"
        fullWidth
        value={taskTitle}
        onChange={(e) => setTaskTitle((e.target as HTMLInputElement).value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        onBlur={() => taskTitle.trim() === '' && setIsAdding(false)}
        style={{ marginBottom: 1 }}
      />
      {/* Button to submit the new task */}
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  ) : (
    // Render "Add Task" button when not in "adding" mode
    <Button variant="outlined" color="primary" onClick={() => setIsAdding(true)}>
      Add Task
    </Button>
  );
};

export default AddTask;
