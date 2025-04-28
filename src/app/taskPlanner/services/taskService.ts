import { get, post, put, del } from '../../../services/api/apiClient';
import { MOCK_TASKS } from '../../../services/api/mockData';

// Types
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  assignedTo: string;
  assignedToName: string;
  category: string;
  caseId: string | null;
  caseName: string | null;
  createdAt: string;
  updatedAt: string;
  attachments: {
    id: string;
    name: string;
    type: string;
    size: string;
  }[];
  comments: {
    id: string;
    user: string;
    userName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface TaskCreateInput {
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  category: string;
  caseId?: string | null;
}

export interface TaskUpdateInput {
  id: string;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'completed';
  assignedTo?: string;
  category?: string;
  caseId?: string | null;
}

export interface TaskComment {
  taskId: string;
  text: string;
}

export interface TaskAttachment {
  taskId: string;
  file: File; // In a real app, this would be a file object
}

// In a real app, these would make API calls
// For now, we'll use mock data

/**
 * Get all tasks
 * @returns List of tasks
 */
export const getTasks = async (): Promise<Task[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return get<Task[]>('/tasks');
  return MOCK_TASKS;
};

/**
 * Get a task by ID
 * @param id Task ID
 * @returns Task details
 */
export const getTaskById = async (id: string): Promise<Task | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return get<Task>(`/tasks/${id}`);
  const task = MOCK_TASKS.find((t) => t.id === id);
  return task || null;
};

/**
 * Create a new task
 * @param taskData Task data
 * @returns Created task
 */
export const createTask = async (taskData: TaskCreateInput): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real app: return post<Task>('/tasks', taskData);
  
  // Mock implementation
  const newTask: Task = {
    id: `${Date.now()}`,
    ...taskData,
    status: 'pending',
    assignedToName: 'John Doe', // In a real app, this would come from the API
    caseName: taskData.caseId ? 'Mock Case' : null, // In a real app, this would come from the API
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    attachments: [],
    comments: [],
  };
  
  return newTask;
};

/**
 * Update a task
 * @param taskData Task data
 * @returns Updated task
 */
export const updateTask = async (taskData: TaskUpdateInput): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return put<Task>(`/tasks/${taskData.id}`, taskData);
  
  // Mock implementation
  const existingTask = MOCK_TASKS.find((t) => t.id === taskData.id);
  
  if (!existingTask) {
    throw new Error('Task not found');
  }
  
  const updatedTask: Task = {
    ...existingTask,
    ...taskData,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedTask;
};

/**
 * Delete a task
 * @param id Task ID
 * @returns Success status
 */
export const deleteTask = async (id: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return del<{ success: boolean }>(`/tasks/${id}`);
  
  // Mock implementation
  return { success: true };
};

/**
 * Toggle task status (pending/completed)
 * @param id Task ID
 * @returns Updated task
 */
export const toggleTaskStatus = async (id: string): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return put<Task>(`/tasks/${id}/toggle-status`);
  
  // Mock implementation
  const existingTask = MOCK_TASKS.find((t) => t.id === id);
  
  if (!existingTask) {
    throw new Error('Task not found');
  }
  
  const updatedTask: Task = {
    ...existingTask,
    status: existingTask.status === 'completed' ? 'pending' : 'completed',
    updatedAt: new Date().toISOString(),
  };
  
  return updatedTask;
};

/**
 * Add a comment to a task
 * @param comment Comment data
 * @returns Updated task
 */
export const addTaskComment = async (comment: TaskComment): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return post<Task>(`/tasks/${comment.taskId}/comments`, { text: comment.text });
  
  // Mock implementation
  const existingTask = MOCK_TASKS.find((t) => t.id === comment.taskId);
  
  if (!existingTask) {
    throw new Error('Task not found');
  }
  
  const newComment = {
    id: `${Date.now()}`,
    user: '1', // Current user ID
    userName: 'John Doe', // Current user name
    text: comment.text,
    timestamp: new Date().toISOString(),
  };
  
  const updatedTask: Task = {
    ...existingTask,
    comments: [...existingTask.comments, newComment],
    updatedAt: new Date().toISOString(),
  };
  
  return updatedTask;
};

/**
 * Add an attachment to a task
 * @param attachment Attachment data
 * @returns Updated task
 */
export const addTaskAttachment = async (attachment: TaskAttachment): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real app: return post<Task>(`/tasks/${attachment.taskId}/attachments`, { file: attachment.file });
  
  // Mock implementation
  const existingTask = MOCK_TASKS.find((t) => t.id === attachment.taskId);
  
  if (!existingTask) {
    throw new Error('Task not found');
  }
  
  const newAttachment = {
    id: `${Date.now()}`,
    name: attachment.file.name,
    type: attachment.file.name.split('.').pop() || 'unknown',
    size: `${(attachment.file.size / (1024 * 1024)).toFixed(1)} MB`,
  };
  
  const updatedTask: Task = {
    ...existingTask,
    attachments: [...existingTask.attachments, newAttachment],
    updatedAt: new Date().toISOString(),
  };
  
  return updatedTask;
};
