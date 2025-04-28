import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Document, getDocuments, getDocumentById, createDocument, updateDocument, deleteDocument, DocumentCreateInput, DocumentUpdateInput } from '../../app/documentVault/services/documentService';

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async (_, { rejectWithValue }) => {
  try {
    return await getDocuments();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const fetchDocumentById = createAsyncThunk('documents/fetchDocumentById', async (id: string, { rejectWithValue }) => {
  try {
    const document = await getDocumentById(id);
    if (!document) {
      return rejectWithValue('Document not found');
    }
    return document;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const addDocument = createAsyncThunk('documents/addDocument', async (documentData: DocumentCreateInput, { rejectWithValue }) => {
  try {
    return await createDocument(documentData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const editDocument = createAsyncThunk('documents/editDocument', async (documentData: DocumentUpdateInput, { rejectWithValue }) => {
  try {
    return await updateDocument(documentData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const removeDocument = createAsyncThunk('documents/removeDocument', async (id: string, { rejectWithValue }) => {
  try {
    const result = await deleteDocument(id);
    if (result.success) {
      return id;
    }
    return rejectWithValue('Failed to delete document');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
    },
    setCurrentDocument: (state, action: PayloadAction<Document>) => {
      state.currentDocument = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch documents
    builder.addCase(fetchDocuments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch document by ID
    builder.addCase(fetchDocumentById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDocumentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentDocument = action.payload;
    });
    builder.addCase(fetchDocumentById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add document
    builder.addCase(addDocument.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents.push(action.payload);
      state.currentDocument = action.payload;
    });
    builder.addCase(addDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Edit document
    builder.addCase(editDocument.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.documents.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
      state.currentDocument = action.payload;
    });
    builder.addCase(editDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove document
    builder.addCase(removeDocument.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents = state.documents.filter((d) => d.id !== action.payload);
      if (state.currentDocument && state.currentDocument.id === action.payload) {
        state.currentDocument = null;
      }
    });
    builder.addCase(removeDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentDocument, setCurrentDocument } = documentSlice.actions;

export default documentSlice.reducer;
