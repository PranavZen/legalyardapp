import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Dashboard: undefined;
  Cases: undefined;
  Documents: undefined;
  Tasks: undefined;
  Finance: undefined;
  More: undefined;
};

// Case Management Stack
export type CaseManagementStackParamList = {
  CaseList: undefined;
  CaseDetail: { id: string };
  CaseForm: { id?: string };
  CaseNotes: { id: string };
};

// Document Vault Stack
export type DocumentVaultStackParamList = {
  DocumentList: undefined;
  DocumentDetail: { id: string };
  DocumentForm: { id?: string; caseId?: string };
  DocumentShare: { id: string };
};

// Task Planner Stack
export type TaskPlannerStackParamList = {
  TaskList: undefined;
  TaskDetail: { id: string };
  TaskForm: { id?: string; caseId?: string };
  TaskCalendar: undefined;
};

// Finance Stack
export type FinanceStackParamList = {
  InvoiceList: undefined;
  InvoiceDetail: { id: string };
  InvoiceForm: { id?: string; caseId?: string };
  TimeEntryList: undefined;
  TimeEntryForm: { id?: string; caseId?: string };
  Reports: undefined;
};

// More Stack
export type MoreStackParamList = {
  More: undefined;
  Profile: undefined;
  Settings: undefined;
  Notifications: undefined;
  Help: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  CaseManagement: NavigatorScreenParams<CaseManagementStackParamList>;
  DocumentVault: NavigatorScreenParams<DocumentVaultStackParamList>;
  TaskPlanner: NavigatorScreenParams<TaskPlannerStackParamList>;
  Finance: NavigatorScreenParams<FinanceStackParamList>;
  More: NavigatorScreenParams<MoreStackParamList>;
};
