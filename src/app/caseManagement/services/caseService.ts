import { MOCK_CASES } from '../../../services/api/mockData';
import {
  Case,
  CaseCreateInput,
  CaseNote,
  CaseNoteInput,
  CaseUpdateInput,
  CaseStatus,
  CasePriority
} from '../../../types';

// In a real app, these would make API calls
// For now, we'll use mock data

/**
 * Get all cases
 * @returns List of cases
 */
export const getCases = async (): Promise<Case[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app: return get<Case[]>('/cases');
  return MOCK_CASES;
};

/**
 * Get a case by ID
 * @param id Case ID
 * @returns Case details
 */
export const getCaseById = async (id: string): Promise<Case | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app: return get<Case>(`/cases/${id}`);
  const caseData = MOCK_CASES.find((c) => c.id === id);
  return caseData || null;
};

/**
 * Create a new case
 * @param caseData Case data
 * @returns Created case
 */
export const createCase = async (caseData: CaseCreateInput): Promise<Case> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real app: return post<Case>('/cases', caseData);

  // Mock implementation
  const newCase: Case = {
    id: `${Date.now()}`,
    title: caseData.title,
    clientId: caseData.clientId,
    clientName: caseData.clientName || 'Mock Client', // In a real app, this would come from the API
    status: caseData.status,
    priority: caseData.priority,
    description: caseData.description,
    practiceArea: caseData.practiceArea,
    assignedTo: caseData.assignedTo,
    dueDate: caseData.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    documents: [],
    tasks: [],
    notes: [],
  };

  return newCase;
};

/**
 * Update a case
 * @param caseData Case data
 * @returns Updated case
 */
export const updateCase = async (caseData: CaseUpdateInput): Promise<Case> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app: return put<Case>(`/cases/${caseData.id}`, caseData);

  // Mock implementation
  const existingCase = MOCK_CASES.find((c) => c.id === caseData.id);

  if (!existingCase) {
    throw new Error('Case not found');
  }

  // Create a new case object with typed properties
  const updatedCase: Case = {
    ...existingCase,
    title: caseData.title !== undefined ? caseData.title : existingCase.title,
    clientId: caseData.clientId !== undefined ? caseData.clientId : existingCase.clientId,
    clientName: caseData.clientName !== undefined ? caseData.clientName : existingCase.clientName,
    status: caseData.status !== undefined ? caseData.status : existingCase.status,
    priority: caseData.priority !== undefined ? caseData.priority : existingCase.priority,
    description: caseData.description !== undefined ? caseData.description : existingCase.description,
    practiceArea: caseData.practiceArea !== undefined ? caseData.practiceArea : existingCase.practiceArea,
    assignedTo: caseData.assignedTo !== undefined ? caseData.assignedTo : existingCase.assignedTo,
    dueDate: caseData.dueDate !== undefined ? caseData.dueDate : existingCase.dueDate,
    updatedAt: new Date().toISOString(),
  };

  return updatedCase;
};

/**
 * Delete a case
 * @param id Case ID
 * @returns Success status
 */
export const deleteCase = async (id: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app: return del<{ success: boolean }>(`/cases/${id}`);

  // Mock implementation
  return { success: true };
};

/**
 * Add a note to a case
 * @param note Note data
 * @returns Updated case
 */
export const addCaseNote = async (note: CaseNoteInput): Promise<Case> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app: return post<Case>(`/cases/${note.caseId}/notes`, { content: note.content });

  // Mock implementation
  const existingCase = MOCK_CASES.find((c) => c.id === note.caseId);

  if (!existingCase) {
    throw new Error('Case not found');
  }

  const newNote: CaseNote = {
    id: `${Date.now()}`,
    caseId: note.caseId,
    content: note.content,
    createdBy: '1', // Current user ID
    createdAt: new Date().toISOString(),
  };

  const updatedCase: Case = {
    ...existingCase,
    notes: [...existingCase.notes, newNote],
    updatedAt: new Date().toISOString(),
  };

  return updatedCase;
};
