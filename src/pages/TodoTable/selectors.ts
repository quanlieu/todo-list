import type { RootState } from '../../app/store';

export const selectTodoStore = (state: RootState) => state.todo;
