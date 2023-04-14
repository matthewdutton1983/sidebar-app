import axios from "axios";
import { Collection } from "../models/Collection";

const COLLECTIONS_ENDPOINT =
  "https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections";

export const fetchCollections = async () => {
  try {
    const response = await axios.get(COLLECTIONS_ENDPOINT);
    return response.data.map(
      (collection) =>
        new Collection(
          collection.id,
          collection.name,
          collection.createdBy,
          collection.createdDate,
          collection.documents
        )
    );
  } catch (error) {
    console.error("Error loading collections", error);
    return [];
  }
};

export const createCollection = async (newCollection) => {
  try {
    const response = await axios.post(COLLECTIONS_ENDPOINT, {
      name: newCollection.name,
      createdBy: newCollection.createdBy,
    });
    const createdCollection = response.data;
    return new Collection(
      createdCollection.id,
      createdCollection.name,
      createdCollection.createdBy,
      createdCollection.createdDate,
      createdCollection.documents
    );
  } catch (error) {
    console.error("Error creating collection", error);
    return null;
  }
};

export const deleteCollection = async (collection) => {
  try {
    await axios.delete(`${COLLECTIONS_ENDPOINT}/${collection.id}`);
  } catch (error) {
    console.error("Error deleting collection", error);
  }
};

export const renameCollection = async (collection, newName) => {
  try {
    const response = await axios.put(
      `${COLLECTIONS_ENDPOINT}/${collection.id}`,
      {
        name: newName,
      }
    );
    const updatedCollection = response.data;
    return new Collection(
      updatedCollection.id,
      updatedCollection.name,
      updatedCollection.createdBy,
      updatedCollection.createdDate,
      updatedCollection.documents
    );
  } catch (error) {
    console.error("Error renaming collection", error);
    return null;
  }
};

export const fetchCollectionById = async (collectionId) => {
  try {
    const response = await axios.get(`${COLLECTIONS_ENDPOINT}/${collectionId}`);
    const collection = response.data;
    return new Collection(
      collection.id,
      collection.name,
      collection.createdBy,
      collection.createdDate,
      collection.documents
    );
  } catch (error) {
    console.error(`Error fetching collection ${collectionId}`, error);
    return null;
  }
};
