const API_ENDPOINT =
  "https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev";

export const COLLECTIONS_ENDPOINT = `${API_ENDPOINT}/collections`;
export const DOCUMENTS_ENDPOINT = (collectionId) =>
  `${API_ENDPOINT}/collections/${collectionId}/documents`;
