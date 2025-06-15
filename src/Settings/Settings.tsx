import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import { useState } from "preact/hooks";
import ColorPicker from "../ColorPicker/ColorPicker";

interface SettingsProps {
    onColorChange: (color: string) => void;
    boardName: string;
    setBoardName: (name: string) => void;
}

const Settings = ({ onColorChange, boardName, setBoardName }: SettingsProps) => {
    // Local state to hold the selected color, defaulting to white
    const [color, setColor] = useState<string>("#ffffff");

    // Handle color change and update both local state and parent component's state
    const handleChangeComplete = (selectedColor: string) => {
        setColor(selectedColor);
        onColorChange(selectedColor);
    };    return (
        <div style={{ marginLeft: '1rem', padding: '1.5rem' }}>
            <Box mb={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Settings
                </Typography>
            </Box>

            {/* Color Picker Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Typography variant="h6" component="p" sx={{ flex: 1 }}>
                    Board background color:
                </Typography>
                <ColorPicker
                    initialColor={color}
                    onChange={handleChangeComplete}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleChangeComplete(color)}
                    sx={{ height: '56px', flexShrink: 0 }}
                >
                    Save Color
                </Button>
            </Box>

            {/* Divider to separate sections */}
            <Divider sx={{ mb: 3 }} />

            
        </div>
    );
};

export default Settings;
