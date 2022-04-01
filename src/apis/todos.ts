import http from './http-common';
import { ITodo, ITodoForm } from '../types/todo';

export const getTodos = () => {
  return http.get<ITodo[]>('todos');
};

export const getTodo = (id: string) => {
  return http.get<ITodo>(`todos/${id}`);
};

export const postTodo = (payload: ITodoForm) => {
  return http.post<ITodo>('todos', payload);
};

export const patchTodo = (payload: ITodo) => {
  const { uuid, ...rest } = payload
  return http.put<ITodo>(`todos/${uuid}`, rest);
};

export const deleteTodo = (uuid: string) => {
  return http.delete<any>(`todos/${uuid}`);
};
