import { Box, Button, Popover } from '@mui/material';
import { useState } from 'preact/hooks';
import { ChromePicker, ColorResult } from 'react-color';

type ColorPickerProps = {
  initialColor?: string;
  onChange?: (color: string) => void;
}

const ColorPicker = ({ initialColor = '#A2A2A2', onChange }: ColorPickerProps) => {
  const [color, setColor] = useState(initialColor);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeComplete = (colorResult: ColorResult) => {
    const newColor = colorResult.hex;
    setColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {/* Button that triggers the opening of the color picker popover */}
      <Button
        variant="contained"
        style={{ width: '5rem', height: '56px', backgroundColor: color, color: 'black' }}
        onClick={handleOpen}
      >
        Pick Color
      </Button>

      {/* Popover that contains the Chrome color picker */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* ChromePicker component for selecting a color */}
        <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
      </Popover>
    </Box>
  );
};

export default ColorPicker;
