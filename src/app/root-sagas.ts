import { all } from 'redux-saga/effects';
import TodoSaga from '../pages/TodoTable/sagas';

export default function* rootSaga() {
  yield all([...TodoSaga]);
}
