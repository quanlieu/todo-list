import { screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import renderWithRedux from '../../utils/test';

import { actions } from './actions';
import TodoDetail from './TodoDetail';

const mockDispatch = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line testing-library/no-node-access
  useNavigate: () => mockUseNavigate,
  useParams: jest.fn(),
}));

jest.mock('../../app/hooks', () => ({
  ...jest.requireActual('../../app/hooks'),
  useAppSelector: () => ({
    todo: {
      uuid: 'abc',
      title: 'Lorem ipsum',
      note: 'Note note note',
      done: true,
    },
  }),
  useAppDispatch: () => mockDispatch,
}));

describe('TodoDetail', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should dispatch create new todo', async () => {
    (useParams as jest.Mock).mockReturnValue({ uuid: 'new' });
    renderWithRedux(<TodoDetail />);
    const screenTitle = screen.getByText('New Todo');
    const submitBtn = screen.getByTestId('submit-btn');
    const titleInput = screen.getByTestId('title-input');
    const noteInput = screen.getByTestId('note-input');

    expect(screenTitle).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('disabled');

    fireEvent.change(titleInput, { target: { value: 'ipsum' } });
    fireEvent.change(noteInput, { target: { value: '123123' } });

    await waitFor(() => {
      expect(submitBtn).not.toHaveAttribute('disabled');
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenLastCalledWith(
        actions.createNewTodoStart({ title: 'ipsum', note: '123123' })
      );
    });
  });

  it('should dispatch create edit todo', async () => {
    (useParams as jest.Mock).mockReturnValue({ uuid: 'abc' });
    renderWithRedux(<TodoDetail />);
    const screenTitle = screen.getByText('Edit Todo');
    const submitBtn = screen.getByTestId('submit-btn');
    const titleInput = screen.getByTestId('title-input');
    const noteInput = screen.getByTestId('note-input');

    expect(screenTitle).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('disabled');

    fireEvent.change(titleInput, { target: { value: 'ipsum' } });
    fireEvent.change(noteInput, { target: { value: '123123' } });

    await waitFor(() => {
      expect(submitBtn).not.toHaveAttribute('disabled');
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenLastCalledWith(
        actions.updateTodoStart({ uuid: 'abc', title: 'ipsum', note: '123123' })
      );
    });
  });
});
