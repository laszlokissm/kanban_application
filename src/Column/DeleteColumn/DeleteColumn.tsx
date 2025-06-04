import { useState } from 'preact/hooks';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteColumnProps = {
  columnId: string;
  onDelete: (columnId: string) => void;
};

/**
 * Component for displaying a delete button and confirming the column deletion.
 * Shows a confirmation dialog when the delete button is clicked.
 */
const DeleteColumn = ({ columnId, onDelete }: DeleteColumnProps) => {
  const [open, setOpen] = useState(false);

  /**
   * Opens the confirmation dialog
   */
  const handleOpen = () => setOpen(true);

  /**
   * Closes the confirmation dialog
   */
  const handleClose = () => setOpen(false);

  /**
   * Confirms the deletion and calls the onDelete function
   */
  const handleConfirmDelete = () => {
    onDelete(columnId);
    setOpen(false);
  };
  return (
    <>
      {/* Delete Button */}
      <IconButton onClick={handleOpen} size="small" sx={{ marginBottom: '7px' }}>
        <DeleteIcon />
      </IconButton>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h6">Confirm Delete</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this column?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteColumn;
