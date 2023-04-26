// import axios from "axios";
// import { DOCUMENTS_ENDPOINT } from "./endpoints";

// export const uploadDocumentsRequest = async (collectionId, formData) => {
//   console.log(`Starting uploadDocumentsRequest for ${collectionId}`);
//   console.log("Form data:", formData);
//   try {
//     const response = await axios.post(
//       DOCUMENTS_ENDPOINT(collectionId),
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log("response:", response);
//     const uploadedDocuments = response.data.uploaded_documents.map(
//       (document) => ({
//         id: document.id,
//         name: document.name,
//         content: document.content,
//       })
//     );
//     console.log(
//       `Successfully uploaded ${uploadedDocuments.length} documents to the collection`
//     );
//     return {
//       message: "Documents uploaded successfully",
//       uploadedDocuments,
//     };
//   } catch (error) {
//     console.log("error.response.data:", error.response.data);
//     console.log("error.response.status:", error.response.status);
//     console.log("error.response.headers:", error.response.headers);
//     throw new Error("error uploading documents");
//   }
// };

// export const fetchDocumentsRequest = async (collectionId) => {
//   console.log(`Starting fetchDocuments for ${collectionId}`);
//   try {
//     const response = await axios.get(DOCUMENTS_ENDPOINT(collectionId));
//     console.log("response:", response);
//     return response.data.map(
//       (document) => new Document(document.id, document.name, document.content)
//     );
//   } catch (error) {
//     console.error(`Error loading documents for collection ${collectionId}`);
//     return [];
//   }
// };

// export const deleteDocumentsRequest = async (documents) => {
//   console.log(`Starting deleteDocuments for ${documents}`);
//   try {
//     await Promise.all(
//       documents.map((document) =>
//         axios.delete(`${DOCUMENTS_ENDPOINT}/${document.bucket}/${document.id}`)
//       )
//     );
//   } catch (error) {
//     console.error(`Error deleting documents: ${error.message}`);
//     throw new Error("Error deleting documents");
//   }
// };
