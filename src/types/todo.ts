export interface ITodo {
  uuid: string;
  title: string;
  note: string;
  done: boolean;
}

export interface ITodoForm {
  title: string;
  note?: string;
  done?: boolean;
}
