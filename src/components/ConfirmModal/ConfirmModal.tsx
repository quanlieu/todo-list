import Modal from '../Modal/Modal';

export interface IProps {
  show: boolean;
  processing?: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

function ConfirmModal(props: IProps) {
  const { show, processing, onSubmit, onClose } = props;

  return (
    <Modal
      show={show}
      onSubmit={onSubmit}
      onClose={onClose}
      disableSubmit={processing}
      title="Are you sure?"
    >
      You can't undo this action.
    </Modal>
  );
}

export default ConfirmModal;
