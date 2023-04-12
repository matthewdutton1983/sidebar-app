export class Collection {
  constructor(id, name, createdDate, createdBy, documents = []) {
    this.id = id;
    this.name = name;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.documents = documents;
  }

  addDocument(document) {
    this.documents.push(document);
  }

  removeDocument(document) {
    const index = this.documents.indexOf(document);
    if (index !== -1) {
      this.documents.splice(index, 1);
    }
  }

  get documentCount() {
    return this.documents.length;
  }
}

// remove id and created date parameters and replace with api functions
