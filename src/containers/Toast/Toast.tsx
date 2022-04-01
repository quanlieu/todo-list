import { useCallback } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import BootstrapToast from 'react-bootstrap/Toast';

import { actions } from './actions';
import { selectToastStore } from './selectors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Toast() {
  const dispatch = useAppDispatch();
  const { show, header, body, variant } = useAppSelector(selectToastStore);
  const onClose = useCallback(() => {
    dispatch(actions.hideToast());
  }, [dispatch]);

  return (
    <ToastContainer position="top-end" className="mt-4 mx-2">
      <div className="mt-5 mx-1">
        <BootstrapToast
          onClose={onClose}
          show={show}
          delay={5000}
          autohide
          bg={variant}
        >
          <BootstrapToast.Header>
            <strong className="me-auto">{header}</strong>
          </BootstrapToast.Header>
          <BootstrapToast.Body>{body}</BootstrapToast.Body>
        </BootstrapToast>
      </div>
    </ToastContainer>
  );
}

export default Toast;
