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
import { actions } from './actions';
import { IDLE, LOADING } from '../../constants/status';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTodoStore } from './selectors';

function TodoTable() {
  const dispatch = useAppDispatch();
  const { loadingStatus, deleteStatus, todos } =
    useAppSelector(selectTodoStore);

  useEffect(() => {
    dispatch(actions.getTodoListStart());
  }, [dispatch]);

  const handleDoneClick = (uuid: string) => {
  };

  const handleDeleteClick = (uuid: string) => {
  };

  if (loadingStatus === IDLE || loadingStatus === LOADING) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>All todos</h2>
        </Col>
        <Col className="text-right">
          <Form.Group className="form-element my-2">
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
            <th>Title</th>
            <th>Note</th>
            <th>Done</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((v, i) => (
            <tr key={v.uuid}>
              <td className="align-middle">{i + 1}</td>
              <td className="align-middle">{v.title}</td>
              <td className="align-middle">{v.note}</td>
              <td className="align-middle">{v.done ? 'Yes' : 'No'}</td>
              <td className="text-center align-middle">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  className="m-1"
                  onClick={() => handleDoneClick(v.uuid)}
                >
                  Done
                </Button>{' '}
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
