import { useEffect, useRef, useState } from 'preact/hooks';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import ColorPicker from '../../ColorPicker/ColorPicker';

type TaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  onUpdateTitle: (title: string) => void;
  tags: TagType[];
  onAddTag: (tag: TagType) => void;
  onDeleteTag: (tag: TagType) => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onSave: () => void;
  desc: string;
  onNewDesc: (desc: string) => void;
};

/**
 * TaskDialog
 * A dialog component for editing task details such as the title, deadline, description, and tags. 
 * Includes features for adding and removing tags, selecting tag colors, and setting a deadline.
 * Updates to task details are passed back to the parent via callback functions.
 */
const TaskDialog = ({
  isOpen,
  onClose,
  taskTitle,
  onUpdateTitle,
  tags,
  onAddTag,
  onDeleteTag,
  selectedDate,
  onDateChange,
  onSave,
  desc,
  onNewDesc
}: TaskDialogProps) => {
  const [newTag, setNewTag] = useState('');
  const [selectedColor, setSelectedColor] = useState('#D2D2D2');  const [tempDesc, setTempDesc] = useState<string>(desc);
  useEffect(()=>{
    setTempDesc(desc)
  },[isOpen]);

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      onAddTag({ name: newTag.trim(), color: selectedColor });
      setNewTag('');
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => { onClose(); setNewTag('')}}>
      <DialogContent sx={{ width: '30rem' }}>
        {/* Task Title Section */}
        <TextField
          variant="outlined"
          value={taskTitle}
          onChange={(e) => onUpdateTitle(e.currentTarget.value)}
          fullWidth
          onKeyDown={(e) => e.key === 'Enter' && onSave()}
          sx={{
            marginBottom: 2,
            paddingTop: '0.25rem',
            fontSize: '1.25rem',
            input: { padding: '0.15rem', fontSize: '1.25rem' },
          }}
        />

        {/* Deadline Section */}
        <Typography variant='subtitle1'>Deadline</Typography>
        <input
          type="date"
          id="deadline"
          name="deadline"
          onChange={(e) =>
            onDateChange(e.currentTarget.value ? new Date(e.currentTarget.value) : null)
          }
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          style={{ padding: '10px' }}
        />

        {/* Description Section */}
        <Typography variant='subtitle1'>Description</Typography>
        <TextField
          multiline
          minRows={5}
          maxRows={10}
          fullWidth
          //defaultValue={desc}
          value={tempDesc}
          onChange={(e) => setTempDesc(e.currentTarget.value)}
          ///onBlur={() => {onNewDesc(tempDesc)}}
        />
        
        {/* Tags Section */}
        <Box>
          <Typography variant="subtitle1">Tags:</Typography>
          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
            {tags.map((tag) => (
              <Chip
                key={tag.name}
                label={tag.name}
                size="small"
                sx={{ backgroundColor: tag.color }}
                onDelete={() => onDeleteTag(tag)}
              />
            ))}
          </Box>

          {/* Add New Tag Section */}
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              fullWidth
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.currentTarget.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <div>
              {/* ColorPicker for selecting a tag color */}
              <ColorPicker initialColor={selectedColor} onChange={setSelectedColor} />
            </div>
            <Button
              variant="outlined"
              onClick={handleAddTag}
              sx={{ width: '10rem', height: '56px' }}
            >
              Add tag
            </Button>
          </Box>
        </Box>
      </DialogContent>

      {/* Dialog Actions Section */}
      <DialogActions>
        <Button onClick={() => {onClose(); setNewTag(''); setTempDesc(desc) }} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => {onSave(); onNewDesc(tempDesc)}} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
