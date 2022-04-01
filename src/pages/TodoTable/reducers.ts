import { AnyAction } from 'redux';
import { types } from './actions';

export interface ITodoState {
}

export const initialState: ITodoState = {
};

export default function homeReducer(
  state: ITodoState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case types.PLACEHOLDER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
