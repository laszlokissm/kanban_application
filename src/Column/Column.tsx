import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { Paper, Typography, Button, TextField, Box, IconButton, Grid2 } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import EditableTitle from './EditableTitle/EditableTitle';
import AddTask from './AddTask/AddTask';
import DeleteColumn from './DeleteColumn/DeleteColumn';

type ColumnProps = {
  title: string;
  tasks: TaskType[];
  columnId: string;
  setColumns: (columns: any) => void;
  onDelete: (cid: string) => void;
};

/**
 * Column component displays a list of tasks with a title and options to add, edit, or delete tasks.
 * It also allows for the column's title to be edited and provides functionality to delete the entire column.
 */
const Column = ({ title, tasks, columnId, setColumns, onDelete }: ColumnProps) => {
  const [newColumnTitle, setNewColumnTitle] = useState<string>(title);

  /**
   * Adds a new task to the column
   * @param taskTitle - The title of the new task to add
   */
  const handleAddTask = (taskTitle: string) => {
    const newTask: TaskType = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      tags: [],
      description: '',
      deadline: null,
    };

    // Adds the new task to the column's tasks
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };
  /**
   * Updates the column title when it is changed
   * @param e - The event object from the input field
   */
  const handleColumnTitleChange = (e: any) => {
    if (newColumnTitle.trim() !== '') {
      title = newColumnTitle;
      // Update the column's title in the state
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === columnId
            ? { ...column, title: newColumnTitle }
            : column
        )
      );
    };
  };

  /**
   * Deletes a task from the column by its ID
   * @param taskId - The ID of the task to delete
   */
  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
          : column
      )
    );
  };

  /**
   * Updates a task's information in the column
   * @param taskId - The ID of the task to update
   * @param updatedTask - The updated task data
   */
  const handleUpdateTask = (taskId: string, updatedTask: Partial<TaskType>) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : column
      )
    );
  };

  return (
    <Paper sx={{ padding: 2, minWidth: '250px', maxWidth: '250px', marginRight: 2 }}>
      {/* Header with editable column title and delete column button */}
      <Grid2 container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid2>
          <EditableTitle
            newTitle={newColumnTitle}
            onSave={handleColumnTitleChange}
            setNewTitle={setNewColumnTitle}
          />
        </Grid2>
        <Grid2>
          <DeleteColumn columnId={columnId} onDelete={onDelete} />
        </Grid2>
      </Grid2>

      {/* Droppable area where tasks can be dragged and dropped */}
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              marginBottom: '10px',
              minHeight: '200px',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            {/* Render the list of tasks in this column */}
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Button to add a new task */}
      <AddTask onAddTask={handleAddTask} />
    </Paper>
  );
};

export default Column;
