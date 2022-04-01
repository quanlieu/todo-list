import type { RootState } from '../../app/store';

export const selectToastStore = (state: RootState) => state.toast;
