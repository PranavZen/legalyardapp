import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import caseReducer from './slices/caseSlice';
import documentReducer from './slices/documentSlice';
import taskReducer from './slices/taskSlice';
import financeReducer from './slices/financeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  cases: caseReducer,
  documents: documentReducer,
  tasks: taskReducer,
  finance: financeReducer,
});

export default rootReducer;
