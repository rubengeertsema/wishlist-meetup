export class Wish {

  public id: string;
  public title: string;
  public description: string;
  public date: Date;

  constructor(id: string, title: string, description: string, date: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
  }
}
