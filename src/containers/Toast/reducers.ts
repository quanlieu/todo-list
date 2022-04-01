import { Component } from 'react';
import { AnyAction } from 'redux';
import { types, VARIANT } from './actions';

export interface IToastState {
  show: boolean;
  variant: string;
  header: string | Component;
  body: string | Component;
}

export const initialState: IToastState = {
  show: false,
  variant: VARIANT.LIGHT,
  header: '',
  body: '',
};

export default function toastReducer(
  state: IToastState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case types.SHOW_TOAST:
      return {
        ...state,
        show: true,
        variant: action.payload.variant || VARIANT.LIGHT,
        header: action.payload.header,
        body: action.payload.body,
      };
    case types.HIDE_TOAST:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
