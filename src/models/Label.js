export class Label {
  constuctor(id, text, color, createdBy, createdDate) {
    this.id = id;
    this.text = text;
    this.color = color;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
  }

  static fromResponse(response) {
    return new Label(
      response.id,
      response.text,
      response.color,
      response.createdBy,
      response.createdDate
    );
  }
}
