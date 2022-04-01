export interface ITodo {
  uuid: string;
  title: string;
  note: string;
  done: boolean;
}

export interface ITodoPost {
  title: string;
  note?: string;
}

export interface ITodoPatch {
  uuid: string;
  title?: string;
  note?: string;
  done?: boolean;
}
