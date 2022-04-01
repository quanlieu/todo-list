import { all } from 'redux-saga/effects';
import TodoSaga from '../pages/TodoTable/sagas';
import TodoDetailSaga from '../pages/TodoDetail/sagas';

export default function* rootSaga() {
  yield all([...TodoSaga, ...TodoDetailSaga]);
}
