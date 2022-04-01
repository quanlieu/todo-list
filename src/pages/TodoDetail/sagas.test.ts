import { all, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { getTodo, newTodo, updateTodo } from './sagas';
import * as todosApi from '../../apis/todos';
import { actions } from './actions';
import {
  actions as toastActions,
  VARIANT,
} from '../../containers/Toast/actions';
import { ITodo } from '../../types/todo';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';

const error = {
  errorMessage: 'Error',
};

const response: AxiosResponse = {
  data: {
    uuid: 'abc',
    title: 'Lorem ipsum',
    note: 'Note note note',
    done: true,
  },
  status: 0,
  statusText: '',
  headers: {},
  config: {},
};

describe('getTodo', () => {
  it('should trigger network call to get all repos', () => {
    const iterator = getTodo(actions.loadTodoStart({ uuid: 'abc' }));
    expect(iterator.next().value).toEqual(call(todosApi.getTodo, 'abc'));
    expect(iterator.next(response).value).toEqual(
      put(actions.loadTodoSuccess({ todo: response.data }))
    );
  });
  it('should put error action', () => {
    const iterator = getTodo(actions.loadTodoStart({ uuid: 'abc' }));
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.loadTodoFailed(error))
    );
  });
});

describe('newTodo', () => {
  it('should trigger network call to create todo', () => {
    const iterator = newTodo(
      actions.createNewTodoStart({ title: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(
      call(todosApi.postTodo, { title: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(put(actions.createNewTodoSuccess()));
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Success',
          body: 'Create new todo success',
          variant: VARIANT.LIGHT,
        })
      )
    );
  });
  it('should put error action', () => {
    const iterator = newTodo(
      actions.createNewTodoStart({ title: 'lorem', note: 'ipsum' })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.createNewTodoFailed(error))
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

describe('updateTodo', () => {
  it('should trigger network call to update a todo', () => {
    const iterator = updateTodo(
      actions.updateTodoStart({ uuid: 'abc', title: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(
      call(todosApi.patchTodo, { uuid: 'abc', title: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(put(actions.updateTodoSuccess()));
    expect(iterator.next().value).toEqual(
      put(
        toastActions.showToast({
          header: 'Success',
          body: 'Update todo success',
          variant: VARIANT.LIGHT,
        })
      )
    );
  });
  it('should put error action', () => {
    const iterator = updateTodo(
      actions.updateTodoStart({ uuid: 'abc', title: 'lorem', note: 'ipsum' })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.updateTodoFailed(error))
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
