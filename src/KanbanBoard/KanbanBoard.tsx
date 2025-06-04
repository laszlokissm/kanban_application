import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Grid, Button, Menu, MenuItem, Typography, Paper, Grid2 } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import FilterButton from './FilterButton/FilterButton';
import { loadFromLocalStorage, saveToLocalStorage } from '../Persist/Persist';

type KanbanBoardProps = {
  incolumns: ColumnType[];
  bgcolor: string;
  boardname: string;
  setCol: (cols: ColumnType[]) => void;
}

const KanbanBoard = ({ incolumns, bgcolor, boardname, setCol }: KanbanBoardProps) => {
  const [columns, setColumns] = useState<ColumnType[]>(loadFromLocalStorage<ColumnType[]>(incolumns));
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    setCol(columns);
  }, [columns]);

  // Save to localStorage on column state change
  useEffect(() => {
    saveToLocalStorage(columns);
  }, [columns]);

  // Handles the end of a drag-and-drop operation
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.id === source.droppableId)!;
      const destinationColumn = prevColumns.find((col) => col.id === destination.droppableId)!;

      const sourceTasks = [...sourceColumn.tasks];
      const [movedTask] = sourceTasks.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceTasks.splice(destination.index, 0, movedTask);
        return prevColumns.map((col) =>
          col.id === source.droppableId ? { ...col, tasks: sourceTasks } : col
        );
      }

      const destinationTasks = [...destinationColumn.tasks];
      destinationTasks.splice(destination.index, 0, movedTask);

      return prevColumns.map((col) =>
        col.id === source.droppableId
          ? { ...col, tasks: sourceTasks }
          : col.id === destination.droppableId
            ? { ...col, tasks: destinationTasks }
            : col
      );
    });
  };

  // Toggles the active status of a tag filter
  const handleTagFilterToggle = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Extracts all tags from the columns and tasks
  const getAllTags = (): string[] => {
    const tags = columns.flatMap((column) =>
      column.tasks.flatMap((task) => task.tags)
    );
    let tagnames = tags.map((tag) => tag.name);
    return Array.from(new Set(tagnames));
  };

  // Filters the columns based on active tag filters
  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: activeTags.length
      ? column.tasks.filter((task) =>
        task.tags.some((tag) => activeTags.includes(tag.name))
      )
      : column.tasks,
  }));

  // Adds a new column to the board
  const handleAddColumn = () => {
    const newColumnId = `column-${Date.now()}`;
    const newColumn: ColumnType = {
      id: newColumnId,
      title: 'New Column',
      tasks: [],
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]); // Add new column to the state
  };

  // Deletes a column from the board
  const handleDeleteColumn = (cid: string) => {
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== cid) // Remove the column with the matching ID
    );
  };

  return (
    <div style={{ backgroundColor: bgcolor }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginBottom: '10px' }}>
        <Grid2 container spacing={2}>
          <Grid2>
            <Typography variant="h4" style={{ flexGrow: 1 }}>{boardname}</Typography>
          </Grid2>
          <Grid2 sx={{ alignSelf: 'center' }}>
            {/* Filter Button */}
            {/* FilterButton Component */}
            <FilterButton
              allTags={getAllTags()}
              activeTags={activeTags}
              onToggleTag={handleTagFilterToggle}
            />
          </Grid2>
          <Grid2 sx={{ alignSelf: 'center' }}>
            {/* Add Column Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddColumn}
            >
              Add Column
            </Button>
          </Grid2>
        </Grid2>
      </div>

      {/* Horizontal Scrollable Area for Columns */}
      <DragDropContext onDragEnd={(result: DropResult) => { handleDragEnd(result); setCol(columns); }}>
        {/* Horizontal scroll container */}
        <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px', height: '91vh' }}>
          {filteredColumns.map((column) => (
            <div key={column.id} style={{ minWidth: '300px', marginRight: '16px', marginLeft: '3px' }}>
              <Column
                title={column.title}
                tasks={column.tasks}
                columnId={column.id}
                setColumns={setColumns}
                onDelete={handleDeleteColumn}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
