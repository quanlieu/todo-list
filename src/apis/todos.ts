import http from './http-common';
import { ITodo, ITodoPost, ITodoPatch } from '../types/todo';

export const getTodos = () => {
  return http.get<ITodo[]>('todos');
};

export const getTodo = (uuid: string) => {
  return http.get<ITodo>(`todos/${uuid}`);
};

export const postTodo = (payload: ITodoPost) => {
  return http.post<ITodo>('todos', payload);
};

export const patchTodo = (payload: ITodoPatch ) => {
  const { uuid, ...rest } = payload
  return http.patch<ITodo>(`todos/${uuid}`, rest);
};

export const deleteTodo = (uuid: string) => {
  return http.delete<any>(`todos/${uuid}`);
};
