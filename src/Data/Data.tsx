type TagType = {
    name: string;
    color: string;
};

type TaskType = {
    id: string;
    title: string;
    tags: TagType[];
    description: string | null;
    deadline: Date | null;
};

type ColumnType = {
    id: string;
    title: string;
    tasks: TaskType[];
};

type KanbanBoardType = {
    id: string;
    title: string;
    columns: ColumnType[];
};

type View = "board" | "upcoming" | "settings";