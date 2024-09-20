export interface IQuestion {
  _id?: string;
  title: string;
  body: string;
  user: string;
  tags?: string[];
  date?: Date;
}
