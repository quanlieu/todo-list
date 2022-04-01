import { call, put, takeEvery } from 'redux-saga/effects';
import { ITodo } from '../../types/todo';
import { types, actions } from './actions';
import * as todosApi from '../../apis/todos';

export function* getTodoList() {
  try {
    const response: { data: ITodo[] } = yield call(todosApi.getTodos);
    yield put(actions.getTodoListSuccess({ todos: response.data }));
  } catch (error: any) {
    yield put(
      actions.getTodoListFailed({
        errorMessage: error?.response?.data?.message || 'Error',
      })
    );
  }
}


const TodoSaga = [
  takeEvery(types.LOAD_TODO_LIST_START, getTodoList),
];

export default TodoSaga;
