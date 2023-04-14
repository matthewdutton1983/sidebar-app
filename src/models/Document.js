export class Document {
  static documentCount = 0;

  constructor(name, content) {
    this.name = name;
    this.content = content;
    Document.documentCount++;
  }
}
