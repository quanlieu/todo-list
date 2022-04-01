import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ITodoState } from '../pages/TodoTable/reducers';
import { IToastState } from '../containers/Toast/reducers';
import reducer from './root-reducer';
import rootSaga from './root-sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export interface RootState {
  todo: ITodoState;
  toast: IToastState;
}

export type AppDispatch = typeof store.dispatch;
