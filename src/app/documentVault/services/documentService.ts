import { get, post, put, del } from '../../../services/api/apiClient';
import { MOCK_DOCUMENTS } from '../../../services/api/mockData';

// Types
export interface Document {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  caseId: string | null;
  caseName: string | null;
  sharedWith: string[];
  versions: {
    id: string;
    version: string;
    date: string;
    author: string;
  }[];
}

export interface DocumentCreateInput {
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
  caseId?: string | null;
  file: File; // In a real app, this would be a file object
}

export interface DocumentUpdateInput {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  caseId?: string | null;
}

export interface DocumentShareInput {
  id: string;
  userIds: string[];
}

// In a real app, these would make API calls
// For now, we'll use mock data

/**
 * Get all documents
 * @returns List of documents
 */
export const getDocuments = async (): Promise<Document[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return get<Document[]>('/documents');
  return MOCK_DOCUMENTS;
};

/**
 * Get a document by ID
 * @param id Document ID
 * @returns Document details
 */
export const getDocumentById = async (id: string): Promise<Document | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return get<Document>(`/documents/${id}`);
  const document = MOCK_DOCUMENTS.find((d) => d.id === id);
  return document || null;
};

/**
 * Create a new document
 * @param documentData Document data
 * @returns Created document
 */
export const createDocument = async (documentData: DocumentCreateInput): Promise<Document> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real app: return post<Document>('/documents', documentData);
  
  // Mock implementation
  const newDocument: Document = {
    id: `${Date.now()}`,
    title: documentData.title,
    description: documentData.description,
    type: documentData.type,
    size: '1.0 MB', // Mock size
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: documentData.category,
    tags: documentData.tags,
    caseId: documentData.caseId || null,
    caseName: documentData.caseId ? 'Mock Case' : null, // In a real app, this would come from the API
    sharedWith: [],
    versions: [
      {
        id: `${Date.now()}-v1`,
        version: '1.0',
        date: new Date().toISOString(),
        author: '1', // Current user ID
      },
    ],
  };
  
  return newDocument;
};

/**
 * Update a document
 * @param documentData Document data
 * @returns Updated document
 */
export const updateDocument = async (documentData: DocumentUpdateInput): Promise<Document> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return put<Document>(`/documents/${documentData.id}`, documentData);
  
  // Mock implementation
  const existingDocument = MOCK_DOCUMENTS.find((d) => d.id === documentData.id);
  
  if (!existingDocument) {
    throw new Error('Document not found');
  }
  
  const updatedDocument: Document = {
    ...existingDocument,
    ...documentData,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedDocument;
};

/**
 * Delete a document
 * @param id Document ID
 * @returns Success status
 */
export const deleteDocument = async (id: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return del<{ success: boolean }>(`/documents/${id}`);
  
  // Mock implementation
  return { success: true };
};

/**
 * Share a document with users
 * @param shareData Share data
 * @returns Updated document
 */
export const shareDocument = async (shareData: DocumentShareInput): Promise<Document> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return post<Document>(`/documents/${shareData.id}/share`, { userIds: shareData.userIds });
  
  // Mock implementation
  const existingDocument = MOCK_DOCUMENTS.find((d) => d.id === shareData.id);
  
  if (!existingDocument) {
    throw new Error('Document not found');
  }
  
  // Add users to sharedWith if they're not already there
  const updatedSharedWith = [...existingDocument.sharedWith];
  shareData.userIds.forEach((userId) => {
    if (!updatedSharedWith.includes(userId)) {
      updatedSharedWith.push(userId);
    }
  });
  
  const updatedDocument: Document = {
    ...existingDocument,
    sharedWith: updatedSharedWith,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedDocument;
};

/**
 * Upload a new version of a document
 * @param id Document ID
 * @param file File to upload
 * @returns Updated document
 */
export const uploadNewVersion = async (id: string, file: File): Promise<Document> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // In a real app: return post<Document>(`/documents/${id}/versions`, { file });
  
  // Mock implementation
  const existingDocument = MOCK_DOCUMENTS.find((d) => d.id === id);
  
  if (!existingDocument) {
    throw new Error('Document not found');
  }
  
  // Calculate new version number
  const latestVersion = existingDocument.versions.reduce((latest, current) => {
    const currentVersion = parseFloat(current.version);
    return currentVersion > latest ? currentVersion : latest;
  }, 0);
  
  const newVersion = {
    id: `${Date.now()}-v${latestVersion + 0.1}`,
    version: (latestVersion + 0.1).toFixed(1),
    date: new Date().toISOString(),
    author: '1', // Current user ID
  };
  
  const updatedDocument: Document = {
    ...existingDocument,
    versions: [...existingDocument.versions, newVersion],
    updatedAt: new Date().toISOString(),
  };
  
  return updatedDocument;
};
