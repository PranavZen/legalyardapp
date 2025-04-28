import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
  currentModule: string | null;
}

const initialState: UIState = {
  isLoading: false,
  toast: {
    show: false,
    message: '',
    type: 'info',
  },
  currentModule: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    setCurrentModule: (state, action: PayloadAction<string>) => {
      state.currentModule = action.payload;
    },
  },
});

export const { setLoading, showToast, hideToast, setCurrentModule } = uiSlice.actions;

export default uiSlice.reducer;
