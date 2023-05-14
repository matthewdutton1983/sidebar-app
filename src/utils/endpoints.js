export const COLLECTIONS_ENDPOINT = `https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections`;

export const DOCUMENTS_ENDPOINT = (collectionId) =>
  `https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections/${collectionId}/documents`;

export const COLLECTION_LABELS_ENDPOINT = (collectionId) =>
  `https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections/${collectionId}/labels`;

export const DOCUMENT_LABELS_ENDPOINT = (collectionId, documentId) =>
  `https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections/${collectionId}/documents/${documentId}/labels`;
