import { useState, useRef, useEffect } from 'preact/hooks';
import { Box, TextField, Typography } from '@mui/material';

type EditableTitleProps = {
  newTitle: string;
  onSave: (newTitle: string) => void;
  setNewTitle: (title: string) => void;
};

/**
 * Component for displaying and editing a title. 
 * When clicked, the title becomes an editable input field.
 * After editing, the title is saved through the `onSave` function.
 */
const EditableTitle = ({ newTitle, onSave, setNewTitle }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Focuses on the input element when entering edit mode
   */
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  /**
   * Saves the new title if it is not empty and exits edit mode
   */
  const handleSave = () => {
    if (newTitle.trim() !== '') {
      onSave(newTitle.trim());
    }
    setIsEditing(false);
  };

  /**
   * Handles the 'Enter' key event to save the title
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (newTitle.trim() !== '') {
        handleSave();
      }
    }
  };
  return isEditing ? (
    // Editable input field when editing
    <Box width={'13rem'}>
      <TextField
        ref={inputRef}
        value={newTitle}
        onChange={(e) => setNewTitle((e.target as HTMLInputElement).value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
        autoFocus
        sx={{ height: '32px', input: { padding: 0, fontSize: '1.25rem' }, marginBottom: '7px' }}
      />
    </Box>
  ) : (
    // Display the title when not in editing mode
    <Typography
      width={'13rem'}
      variant="h6"
      gutterBottom
      onClick={() => setIsEditing(true)}
      sx={{ cursor: 'pointer' }}
    >
      {newTitle}
    </Typography>
  );
};

export default EditableTitle;
