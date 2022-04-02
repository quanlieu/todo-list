import { useCallback, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { useModal } from '../../hooks/useModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { actions } from './actions';
import { IDLE, LOADING } from '../../constants/status';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTodoStore } from './selectors';
import { ITodo } from '../../types/todo';

function TodoTable() {
  const dispatch = useAppDispatch();
  const { loadingStatus, deleteStatus, updateStatus, todos } =
    useAppSelector(selectTodoStore);

  const [modalOpen, setModalOpen, modalState, setModalState] = useModal(false);

  useEffect(() => {
    dispatch(actions.getTodoListStart());
  }, [dispatch]);

  const handleToggle = (todo: ITodo) => {
    dispatch(actions.toggleTodoStart(todo));
  };

  const handleDeleteClick = (uuid: string) => {
    setModalOpen(true);
    setModalState({ uuid });
  };

  const deleteTodo = useCallback(() => {
    dispatch(actions.deleteTodoStart(modalState as { uuid: string }));
    setModalOpen(false);
  }, [dispatch, setModalOpen, modalState]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  if (loadingStatus === IDLE || loadingStatus === LOADING) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <Container>
      <ConfirmModal
        onSubmit={deleteTodo}
        onClose={closeModal}
        processing={deleteStatus === LOADING}
        show={modalOpen || deleteStatus === LOADING}
      />
      <Row className="my-2">
        <Col>
          <h2>All todos</h2>
        </Col>
        <Col className="text-right">
          <Form.Group className="form-element">
            <Link to="new">
              <Button variant="primary" type="submit">
                New todo
              </Button>
            </Link>
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Todo</th>
            <th className="text-center">Toggle</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((v, i) => (
            <tr key={v.uuid}>
              <td className="align-middle">{i + 1}</td>
              <td className="align-middle">
                {v.done ? <s><b>{v.title}</b></s> : <b>{v.title}</b>}
                <br />
                {v.done ? <s>{v.note}</s> : v.note}
              </td>
              <td className="text-center align-middle">
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="m-1"
                  disabled={updateStatus === LOADING}
                  data-testid={`toggle-btn-${v.uuid}`}
                  onClick={() => handleToggle(v)}
                >
                  {v.done ? 'Undone' : 'Done'}
                </Button>
              </td>
              <td className="text-center align-middle">
                <Link to={v.uuid} state={v}>
                  <Button size="sm" variant="outline-secondary" className="m-1">
                    Edit
                  </Button>
                </Link>{' '}
                <Button
                  size="sm"
                  variant="outline-danger"
                  className="m-1"
                  onClick={() => handleDeleteClick(v.uuid)}
                  data-testid={`delete-btn-${v.uuid}`}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TodoTable;
