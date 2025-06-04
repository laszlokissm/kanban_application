import { IconButton } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';

type SettingsButtonProps = {
    select: (sel: View) => void;
}

const SettingsButton = ({ select }: SettingsButtonProps) => {
    return (
        // IconButton for triggering the settings view
        <IconButton 
            onClick={() => select("settings")}
            size="small"
            sx={{ marginBottom: '7px' }}
        >
            <SettingsIcon />
        </IconButton>
    );
}

export default SettingsButton;
