import { Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid2 } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SettingsButton from './SettingsButton/SettingsButton';

type LeftPaneProps = {
    select: (sel: View) => void;
}

const LeftPane = ({ select }: LeftPaneProps) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px', padding: '10px', backgroundColor: '#f4f4f4' }}>
                {/* Header Section */}
                <Grid2 container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid2>
                        <Typography variant="h6">Kanban Board</Typography>
                    </Grid2>
                    <Grid2>
                        <SettingsButton select={select} />
                    </Grid2>
                </Grid2>

                {/* List of navigation options */}
                <List>
                    {/* "My Board" Option */}
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => select("board")}>
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText>My Board</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    {/* "Upcoming Deadlines" Option */}
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => select("upcoming")}>
                            <ListItemIcon>
                                <WatchLaterIcon />
                            </ListItemIcon>
                            <ListItemText>Upcoming deadlines</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>

        </div>
    );
};

export default LeftPane;
