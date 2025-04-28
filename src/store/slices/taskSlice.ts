import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, getTasks, getTaskById, createTask, updateTask, deleteTask, toggleTaskStatus, TaskCreateInput, TaskUpdateInput } from '../../app/taskPlanner/services/taskService';

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    return await getTasks();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const fetchTaskById = createAsyncThunk('tasks/fetchTaskById', async (id: string, { rejectWithValue }) => {
  try {
    const task = await getTaskById(id);
    if (!task) {
      return rejectWithValue('Task not found');
    }
    return task;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData: TaskCreateInput, { rejectWithValue }) => {
  try {
    return await createTask(taskData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const editTask = createAsyncThunk('tasks/editTask', async (taskData: TaskUpdateInput, { rejectWithValue }) => {
  try {
    return await updateTask(taskData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (id: string, { rejectWithValue }) => {
  try {
    const result = await deleteTask(id);
    if (result.success) {
      return id;
    }
    return rejectWithValue('Failed to delete task');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const toggleTask = createAsyncThunk('tasks/toggleTask', async (id: string, { rejectWithValue }) => {
  try {
    return await toggleTaskStatus(id);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch task by ID
    builder.addCase(fetchTaskById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTaskById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentTask = action.payload;
    });
    builder.addCase(fetchTaskById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add task
    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks.push(action.payload);
      state.currentTask = action.payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Edit task
    builder.addCase(editTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.currentTask = action.payload;
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove task
    builder.addCase(removeTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      if (state.currentTask && state.currentTask.id === action.payload) {
        state.currentTask = null;
      }
    });
    builder.addCase(removeTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Toggle task status
    builder.addCase(toggleTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(toggleTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      if (state.currentTask && state.currentTask.id === action.payload.id) {
        state.currentTask = action.payload;
      }
    });
    builder.addCase(toggleTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentTask, setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;
