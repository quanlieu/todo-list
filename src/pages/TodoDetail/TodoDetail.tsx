import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { actions } from './actions';
import { FAILED, LOADING, SUCCESS } from '../../constants/status';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTodoDetailStore } from './selectors';
import { ITodoPost } from '../../types/todo';

const formSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  note: Yup.string(),
});

function TodoDetail() {
  const { uuid = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { createUpdateStatus, loadingStatus, todo } = useAppSelector(
    selectTodoDetailStore
  );

  const { register, handleSubmit, formState, reset } = useForm<ITodoPost>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      note: '',
    },
  });

  const onSubmit = (data: ITodoPost) => {
    if (uuid === 'new') {
      dispatch(actions.createNewTodoStart(data));
    } else {
      dispatch(
        actions.updateTodoStart({
          uuid,
          ...data,
        })
      );
    }
  };

  useEffect(() => {
    // Load todo info if it is edit mode
    if (uuid !== 'new') {
      dispatch(actions.loadTodoStart({ uuid }));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    // Refill form value when the todo loaded
    if (loadingStatus === SUCCESS) {
      reset({
        title: todo?.title,
        note: todo?.note,
      });
    }
  }, [loadingStatus, todo, reset]);

  useEffect(() => {
    // Prevent user access this page with invalid uuid
    if (uuid !== 'new' && loadingStatus === FAILED) {
      navigate('/todos');
    }
  }, [loadingStatus, navigate, uuid]);

  useEffect(() => {
    // Go back to todo list after create / edit success
    if (createUpdateStatus === SUCCESS) {
      navigate('/todos');
    }
  }, [createUpdateStatus, navigate]);

  useEffect(
    () => () => {
      dispatch(actions.todoDetailReset());
    },
    [dispatch]
  );

  if (loadingStatus === LOADING) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h2 className="mb-3 mt-3 text-center">
          {uuid === 'new' ? 'New' : 'Edit'} Todo
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              data-testid="title-input"
              {...register('title', { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Note"
              data-testid="note-input"
              {...register('note', { required: true })}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={!formState.isValid || createUpdateStatus === LOADING}
            data-testid="submit-btn"
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default TodoDetail;
