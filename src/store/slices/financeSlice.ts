import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../utils/errorUtils';
import { Invoice, TimeEntry, getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice, getTimeEntries, createTimeEntry, updateTimeEntry, deleteTimeEntry, InvoiceCreateInput, InvoiceUpdateInput, TimeEntryCreateInput, TimeEntryUpdateInput } from '../../app/finance/services/financeService';

interface FinanceState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  timeEntries: TimeEntry[];
  currentTimeEntry: TimeEntry | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  invoices: [],
  currentInvoice: null,
  timeEntries: [],
  currentTimeEntry: null,
  isLoading: false,
  error: null,
};

// Async thunks for invoices
export const fetchInvoices = createAsyncThunk('finance/fetchInvoices', async (_, { rejectWithValue }) => {
  try {
    return await getInvoices();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchInvoiceById = createAsyncThunk('finance/fetchInvoiceById', async (id: string, { rejectWithValue }) => {
  try {
    const invoice = await getInvoiceById(id);
    if (!invoice) {
      return rejectWithValue('Invoice not found');
    }
    return invoice;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addInvoice = createAsyncThunk('finance/addInvoice', async (invoiceData: InvoiceCreateInput, { rejectWithValue }) => {
  try {
    return await createInvoice(invoiceData);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const editInvoice = createAsyncThunk('finance/editInvoice', async (invoiceData: InvoiceUpdateInput, { rejectWithValue }) => {
  try {
    return await updateInvoice(invoiceData);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const removeInvoice = createAsyncThunk('finance/removeInvoice', async (id: string, { rejectWithValue }) => {
  try {
    const result = await deleteInvoice(id);
    if (result.success) {
      return id;
    }
    return rejectWithValue('Failed to delete invoice');
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Async thunks for time entries
export const fetchTimeEntries = createAsyncThunk('finance/fetchTimeEntries', async (_, { rejectWithValue }) => {
  try {
    return await getTimeEntries();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addTimeEntry = createAsyncThunk('finance/addTimeEntry', async (timeEntryData: TimeEntryCreateInput, { rejectWithValue }) => {
  try {
    return await createTimeEntry(timeEntryData);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const editTimeEntry = createAsyncThunk('finance/editTimeEntry', async (timeEntryData: TimeEntryUpdateInput, { rejectWithValue }) => {
  try {
    return await updateTimeEntry(timeEntryData);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const removeTimeEntry = createAsyncThunk('finance/removeTimeEntry', async (id: string, { rejectWithValue }) => {
  try {
    const result = await deleteTimeEntry(id);
    if (result.success) {
      return id;
    }
    return rejectWithValue('Failed to delete time entry');
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },
    setCurrentInvoice: (state, action: PayloadAction<Invoice>) => {
      state.currentInvoice = action.payload;
    },
    clearCurrentTimeEntry: (state) => {
      state.currentTimeEntry = null;
    },
    setCurrentTimeEntry: (state, action: PayloadAction<TimeEntry>) => {
      state.currentTimeEntry = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch invoices
    builder.addCase(fetchInvoices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.invoices = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch invoice by ID
    builder.addCase(fetchInvoiceById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInvoiceById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentInvoice = action.payload;
    });
    builder.addCase(fetchInvoiceById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add invoice
    builder.addCase(addInvoice.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.invoices.push(action.payload);
      state.currentInvoice = action.payload;
    });
    builder.addCase(addInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Edit invoice
    builder.addCase(editInvoice.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.invoices.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
      state.currentInvoice = action.payload;
    });
    builder.addCase(editInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove invoice
    builder.addCase(removeInvoice.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.invoices = state.invoices.filter((i) => i.id !== action.payload);
      if (state.currentInvoice && state.currentInvoice.id === action.payload) {
        state.currentInvoice = null;
      }
    });
    builder.addCase(removeInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch time entries
    builder.addCase(fetchTimeEntries.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTimeEntries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.timeEntries = action.payload;
    });
    builder.addCase(fetchTimeEntries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add time entry
    builder.addCase(addTimeEntry.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addTimeEntry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.timeEntries.push(action.payload);
      state.currentTimeEntry = action.payload;
    });
    builder.addCase(addTimeEntry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Edit time entry
    builder.addCase(editTimeEntry.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editTimeEntry.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.timeEntries.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.timeEntries[index] = action.payload;
      }
      state.currentTimeEntry = action.payload;
    });
    builder.addCase(editTimeEntry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove time entry
    builder.addCase(removeTimeEntry.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeTimeEntry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.timeEntries = state.timeEntries.filter((t) => t.id !== action.payload);
      if (state.currentTimeEntry && state.currentTimeEntry.id === action.payload) {
        state.currentTimeEntry = null;
      }
    });
    builder.addCase(removeTimeEntry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentInvoice, setCurrentInvoice, clearCurrentTimeEntry, setCurrentTimeEntry } = financeSlice.actions;

export default financeSlice.reducer;
