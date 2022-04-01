import ReactBootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export interface IProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  disableSubmit?: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

function Modal(props: IProps) {
  const { show, title, children, disableSubmit, onSubmit, onClose } = props;

  return (
    <ReactBootstrapModal show={show} onHide={onClose}>
      <ReactBootstrapModal.Header closeButton>
        <ReactBootstrapModal.Title>{title}</ReactBootstrapModal.Title>
      </ReactBootstrapModal.Header>
      <ReactBootstrapModal.Body>{children}</ReactBootstrapModal.Body>
      <ReactBootstrapModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={disableSubmit}>
          Confirm
        </Button>
      </ReactBootstrapModal.Footer>
    </ReactBootstrapModal>
  );
}

export default Modal;
