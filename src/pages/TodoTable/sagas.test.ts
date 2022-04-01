import { call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { getTodoList, toggleTodo, deleteTodo } from './sagas';
import * as todosApi from '../../apis/todos';
import { actions } from './actions';
import {
  actions as toastActions,
  VARIANT,
} from '../../containers/Toast/actions';

const error = {
  errorMessage: 'Error',
};

const response: AxiosResponse = {
  data: [
    {
      uuid: 'abc',
      title: 'Lorem ipsum',
      note: 'Note note note',
      done: true,
    },
    {
      uuid: 'def',
      title: 'Lorem ipsum dolor',
      note: 'Note note note',
      done: false,
    },
  ],
  status: 0,
  statusText: '',
  headers: {},
  config: {},
};

describe('getTodoList', () => {
  it('should trigger network call to get all todos', () => {
    const iterator = getTodoList();
    expect(iterator.next().value).toEqual(call(todosApi.getTodos));
    expect(iterator.next(response).value).toEqual(
      put(actions.getTodoListSuccess({ todos: response.data }))
    );
  });
  it('should put error action', () => {
    const iterator = getTodoList();
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.getTodoListFailed(error))
    );
  });
});

describe('toggleTodo', () => {
  it('should trigger network toggle todo from true to false', () => {
    const iterator = toggleTodo(
      actions.toggleTodoStart({
        uuid: 'abc',
        title: 'Lorem ipsum',
        note: 'Note note note',
        done: false,
      })
    );
    expect(iterator.next().value).toEqual(
      call(todosApi.patchTodo, {
        uuid: 'abc',
        done: true,
      })
    );
    expect(iterator.next().value).toEqual(put(actions.toggleTodoSuccess()));
    expect(iterator.next().value).toEqual(put(actions.getTodoListStart()));
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Success',
          body: `Todo set to done success`,
          variant: VARIANT.LIGHT,
        })
      )
    );
  });
  it('should trigger network toggle todo from false to true', () => {
    const iterator = toggleTodo(
      actions.toggleTodoStart({
        uuid: 'def',
        title: 'Lorem ipsum dolor',
        note: 'Note note note',
        done: true,
      })
    );
    expect(iterator.next().value).toEqual(
      call(todosApi.patchTodo, {
        uuid: 'def',
        done: false,
      })
    );
    expect(iterator.next().value).toEqual(put(actions.toggleTodoSuccess()));
    expect(iterator.next().value).toEqual(put(actions.getTodoListStart()));
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Success',
          body: `Todo set to undone success`,
          variant: VARIANT.LIGHT,
        })
      )
    );
  });
  it('should put error action', () => {
    const iterator = toggleTodo(
      actions.toggleTodoStart({
        uuid: 'abc',
        title: 'Lorem ipsum',
        note: 'Note note note',
        done: false,
      })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.toggleTodoFailed(error))
    );
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Error',
          body: 'Error',
          variant: VARIANT.DANGER,
        })
      )
    );
  });
});

describe('deleteTodo', () => {
  it('should trigger network call to delete todo', () => {
    const iterator = deleteTodo(actions.deleteTodoStart({ uuid: 'abc' }));
    expect(iterator.next().value).toEqual(call(todosApi.deleteTodo, 'abc'));
    expect(iterator.next().value).toEqual(put(actions.deleteTodoSuccess()));
    expect(iterator.next().value).toEqual(put(actions.getTodoListStart()));
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Success',
          body: 'Delete todo success',
          variant: VARIANT.LIGHT,
        })
      )
    );
  });
  it('should put error action', () => {
    const iterator = deleteTodo(actions.deleteTodoStart({ uuid: 'abc' }));
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.deleteTodoFailed(error))
    );
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Error',
          body: 'Error',
          variant: VARIANT.DANGER,
        })
      )
    );
  });
});
