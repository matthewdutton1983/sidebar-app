import axios from "axios";
import { Document } from "./Document";
import {
  COLLECTIONS_ENDPOINT,
  COLLECTION_LABELS_ENDPOINT,
  DOCUMENTS_ENDPOINT,
} from "../utils/endpoints";

export class Collection {
  constructor(id, name, createdBy, createdDate, documents = [], labels = []) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.documents = documents;
    this.labels = labels;
  }

  // Fetch all collections from the server
  static async fetchCollections() {
    console.log(`Loading collections...`);
    try {
      const response = await axios.get(COLLECTIONS_ENDPOINT);
      console.log("response:", response.data);
      return response.data.map((collection) => {
        const { id, name, createdBy, createdDate, documents } = collection;
        const collectionObject = new Collection(
          id,
          name,
          createdBy,
          createdDate,
          documents
        );
        console.log("Collection object:", collectionObject);
        return collectionObject;
      });
    } catch (error) {
      console.error("Error loading collections", error);
      return [];
    }
  }

  // Fetch a specific collection from the server
  static async fetchCollectionById(collectionId) {
    console.log(`Fetching collection ${collectionId}`);
    try {
      const response = await axios.get(
        `${COLLECTIONS_ENDPOINT}/${collectionId}`
      );
      const collection = response.data;
      console.log("response:", response.data);
      const collectionObject = new Collection(
        collection.id,
        collection.name,
        collection.createdBy,
        collection.createdDate,
        collection.documents,
        collection.labels
      );
      console.log("Collection object:", collectionObject);
      return collectionObject;
    } catch (error) {
      console.error(`Error fetching collection ${collectionId}`, error);
      return null;
    }
  }

  // Create a new collection on the server
  static async createCollection(newCollection) {
    console.log("Creating a new collection ...");
    try {
      const response = await axios.post(
        COLLECTIONS_ENDPOINT,
        {
          name: newCollection.name,
          createdBy: newCollection.createdBy,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data:", response.data);
      const createdCollection = new Collection(
        response.data.data.id,
        response.data.data.name,
        response.data.data.createdBy,
        response.data.data.createdDate,
        response.data.data.documents
      );
      return createdCollection;
    } catch (error) {
      console.error("Error creating collection", error);
      return null;
    }
  }

  // Delete the current collection from the server
  static async deleteCollection(collection) {
    console.log(`Deleting collection ${collection.id}`);
    try {
      await axios.delete(`${COLLECTIONS_ENDPOINT}/${collection.id}`);
      console.log(`Deleted collection ${collection.id}`);
    } catch (error) {
      console.error(`Error deleting collection ${collection.id}`, error);
      throw error;
    }
  }

  // Rename the current collection on the server
  static async renameCollection(collection, newName) {
    console.log(`Renaming collection ${collection.id}`);
    try {
      const response = await axios.put(
        `${COLLECTIONS_ENDPOINT}/${collection.id}`,
        {
          name: newName,
        }
      );
      const updatedCollection = response.data;
      collection.name = updatedCollection.name;
      console.log(`Collection ${collection.id} renamed successfully`);
      return collection;
    } catch (error) {
      console.error("Error renaming collection", error);
      return null;
    }
  }

  // Upload one or more documents to the server
  async uploadDocuments(files) {
    console.log("Files to be uploaded:", files);
    const documents = await Promise.all(
      files.map(async (file) => {
        console.log(`Uploading file ${file.name}`);
        const response = await axios.post(DOCUMENTS_ENDPOINT(this.id), file, {
          headers: {
            "Content-Type": file.type,
            "x-file-name": file.name,
            "x-file-type": file.type,
            "x-collection-id": this.id,
          },
        });
        console.log("response.data:", response.data);
        const { id, url } = response.data;
        return new Document(id, file.name, file.type, url);
      })
    );
    this.documents.push(...documents);
    return documents;
  }

  // Fetch a document from the server
  async fetchDocumentById(documentId) {
    console.log(`Fetching document ${documentId} from collection ${this.id}`);
    try {
      const response = await axios.get(
        `${DOCUMENTS_ENDPOINT(this.id)}/${documentId}`
      );
      const document = response.data;
      console.log("response:", response.data);
      const { id, name, type, content } = document;
      const documentObject = new Document(id, name, type, content);
      console.log("documentObject:", documentObject);
      return documentObject;
    } catch (error) {
      console.error(`Error fetching document ${documentId}`, error);
      return null;
    }
  }

  // Remove one or more documents on the server
  // TODO: NEED TO FIX THIS
  async removeDocument(documentId) {
    console.log(`Starting removeDocument for ${documentId}`);
    try {
      await axios.delete(`${DOCUMENTS_ENDPOINT(this.id)}/${documentId}`);
      this.documents = this.documents.filter((doc) => doc.id !== documentId);
    } catch (error) {
      console.error(error);
      throw new Error(`Error removing document from collection ${this.id}`);
    }
  }

  // Create a new label in the current collection on the server
  async createLabel(label) {
    console.log(`Creating a new label in collection ${this.id}`);
    try {
      const response = await axios.post(
        COLLECTION_LABELS_ENDPOINT,
        {
          collectionId: this.id,
          text: label.text,
          color: label.color,
          createdBy: label.createdBy,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data:", response.data);
      await this.fetchLabels();
    } catch (error) {
      console.error("Error creating label", error);
    }
  }
}
