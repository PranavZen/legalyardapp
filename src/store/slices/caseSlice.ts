import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  addCaseNote,
} from '../../app/caseManagement/services/caseService';
import {
  Case,
  CaseCreateInput,
  CaseUpdateInput,
  CaseNoteInput,
  CasesState
} from '../../types';

const initialState: CasesState = {
  cases: [],
  currentCase: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchCases = createAsyncThunk('cases/fetchCases', async (_, { rejectWithValue }) => {
  try {
    return await getCases();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch cases');
  }
});

export const fetchCaseById = createAsyncThunk('cases/fetchCaseById', async (id: string, { rejectWithValue }) => {
  try {
    const caseData = await getCaseById(id);
    if (!caseData) {
      return rejectWithValue('Case not found');
    }
    return caseData;
  } catch (error: any) {
    return rejectWithValue(error.message || `Failed to fetch case with ID: ${id}`);
  }
});

export const addCase = createAsyncThunk('cases/addCase', async (caseData: CaseCreateInput, { rejectWithValue }) => {
  try {
    return await createCase(caseData);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to create case');
  }
});

export const editCase = createAsyncThunk('cases/editCase', async (caseData: CaseUpdateInput, { rejectWithValue }) => {
  try {
    return await updateCase(caseData);
  } catch (error: any) {
    return rejectWithValue(error.message || `Failed to update case with ID: ${caseData.id}`);
  }
});

export const removeCase = createAsyncThunk('cases/removeCase', async (id: string, { rejectWithValue }) => {
  try {
    const result = await deleteCase(id);
    if (result.success) {
      return id;
    }
    return rejectWithValue('Failed to delete case');
  } catch (error: any) {
    return rejectWithValue(error.message || `Failed to delete case with ID: ${id}`);
  }
});

export const addNote = createAsyncThunk('cases/addNote', async (noteData: CaseNoteInput, { rejectWithValue }) => {
  try {
    return await addCaseNote(noteData);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add note');
  }
});

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    clearCurrentCase: (state) => {
      state.currentCase = null;
    },
    setCurrentCase: (state, action: PayloadAction<Case>) => {
      state.currentCase = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch cases
    builder.addCase(fetchCases.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCases.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cases = action.payload;
    });
    builder.addCase(fetchCases.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch case by ID
    builder.addCase(fetchCaseById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCaseById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentCase = action.payload;
    });
    builder.addCase(fetchCaseById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add case
    builder.addCase(addCase.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addCase.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cases.push(action.payload);
      state.currentCase = action.payload;
    });
    builder.addCase(addCase.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Edit case
    builder.addCase(editCase.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editCase.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.cases.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.cases[index] = action.payload;
      }
      state.currentCase = action.payload;
    });
    builder.addCase(editCase.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove case
    builder.addCase(removeCase.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeCase.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cases = state.cases.filter((c) => c.id !== action.payload);
      if (state.currentCase && state.currentCase.id === action.payload) {
        state.currentCase = null;
      }
    });
    builder.addCase(removeCase.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add note
    builder.addCase(addNote.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentCase = action.payload;
      // Update the case in the cases array
      const index = state.cases.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.cases[index] = action.payload;
      }
    });
    builder.addCase(addNote.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentCase, setCurrentCase } = caseSlice.actions;

export default caseSlice.reducer;
