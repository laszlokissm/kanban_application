import { useEffect, useState } from 'preact/hooks';
import {
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskDialog from './TaskSettingDialog/TaskSettingDialog';

type TaskProps = {
  task: TaskType;
  index: number;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<TaskType>) => void;
};

const Task = ({ task, index, onDelete, onUpdate }: TaskProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [tags, setTags] = useState(task.tags || []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(task.deadline);
  const [newDesc, setNewDesc] = useState(task.description);
  useEffect(() => {
    onUpdate(task.id, { description: newDesc });
  }, [newDesc]);

  const handleUpdateTask = () => {
    if (newTitle.trim() !== '') {
      onUpdate(task.id, { title: newTitle, tags, description: newDesc, deadline: selectedDate });
    }
    setIsDialogOpen(false);
  };

  const handleAddTag = (tag: TagType) => {
    let tagnames = tags.map((tag) => tag.name);
    if (!tagnames.includes(tag.name)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      onUpdate(task.id, { tags: updatedTags });
    }
  };
  const handleDeleteTag = (tagToDelete: TagType) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    onUpdate(task.id, { tags: updatedTags });
  };

  const handleNewDesc = (innewdesc: string) => {
    setNewDesc(innewdesc);
  };
  return (
    <>
      {/* Draggable task component */}
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              marginBottom: '10px',
              padding: '8px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >            <Box sx={{ flex: 1, marginRight: 1 }}>
              <Typography variant="body1">{task.title}</Typography>
              <Box
                style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}
              >
                {/* Display tags as chips */}
                {tags.map((tag) => (
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    size="small"
                    onDelete={() => handleDeleteTag(tag)}
                    style={{ fontSize: '0.75rem', backgroundColor: tag.color }}
                  />
                ))}
              </Box>
            </Box>
            <Box>
              {/* Edit and delete buttons */}
              <IconButton onClick={() => setIsDialogOpen(true)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(task.id)} size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          </div>
        )}
      </Draggable>      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        taskTitle={newTitle}
        onUpdateTitle={setNewTitle}
        tags={tags}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onSave={handleUpdateTask}
        desc={newDesc}
        onNewDesc={handleNewDesc}
      />
    </>
  );
};

export default Task;
