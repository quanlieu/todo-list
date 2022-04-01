export const types = {
  SHOW_TOAST: 'SHOW_TOAST',
  HIDE_TOAST: 'HIDE_TOAST',
};

export const VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  DARK: 'dark',
  LIGHT: 'light',
};


export const actions = {
  showToast: (payload: { header: string, body: string, variant?: string }) => ({
    type: types.SHOW_TOAST,
    payload
  }),
  hideToast: () => ({
    type: types.HIDE_TOAST,
  }),
};
