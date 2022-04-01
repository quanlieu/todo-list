import { put, takeEvery } from 'redux-saga/effects';
import { types, actions } from './actions';

export function* placeholder() {
  yield put(actions.placeHolder());
}


const TodoSaga = [
  takeEvery(types.PLACEHOLDER, placeholder),
];

export default TodoSaga;
