import { Grid2 } from "@mui/material";
import { useState, useEffect } from "preact/hooks";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import LeftPane from "../LeftPane/LeftPane";
import UpcomingTasks from "../UpcomingTasks/UpcomingTasks";
import Settings from "../Settings/Settings";

export function Main() {
    const [boardSelected, setBoardSelected] = useState<View>("board");

    const [ic, setIc] = useState<ColumnType[]>([
        {
            id: 'column-1',
            title: 'To Do',
            tasks: [],
        },
        {
            id: 'column-2',
            title: 'In Progress',
            tasks: [],
        },
        {
            id: 'column-3',
            title: 'Done',
            tasks: [],
        },
    ]);    const [bgColor, setBgcolor] = useState<string>("#ffffff");
    const [boardName, setBoardName] = useState<string>("My Board");
    const allTasks = ic.flatMap((column) => column.tasks);

    return (
        <Grid2 container spacing={0}>
            {/* Left Pane - Only visible on medium screens and up */}
            <Grid2 size={2} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                {/* Left Pane Component for navigation */}
                <LeftPane select={setBoardSelected} />
            </Grid2>

            {/* Main Content Area - Takes up most of the screen width */}
            <Grid2 size={10} sx={{ display: 'block' }}>
                {/* Conditionally render the board, upcoming tasks, or settings view based on `boardSelected` */}
                {
                    boardSelected === "board" ? (
                        // Kanban board view with columns, background color, and board name
                        <KanbanBoard incolumns={ic} bgcolor={bgColor} boardname={boardName} setCol={setIc} />
                    ) : boardSelected === "upcoming" ? (
                        // Upcoming tasks view showing tasks across all columns
                        <UpcomingTasks tasks={allTasks} />
                    ) : boardSelected === "settings" ? (
                        // Settings view allowing customization of the board name and background color
                        <Settings onColorChange={setBgcolor} boardName={boardName} setBoardName={setBoardName} />
                    ) : (
                        <></>
                    )
                }
            </Grid2>
        </Grid2>
    )
}
