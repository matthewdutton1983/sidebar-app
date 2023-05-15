export class Document {
  constructor(id, name, type, content, labels = []) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.content = content;
    this.labels = labels;
  }

  // add static from response method

  applyLabel(label) {
    this.labels.push(label);
  }
}
