import { screen, fireEvent, cleanup } from '@testing-library/react';
import renderWithRedux from '../../utils/test';

import { actions } from './actions';
import TodoTable from './TodoTable';

const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line testing-library/no-node-access
  Link: (props: any) => <a href="http://#">{props.children}</a>,
}));

jest.mock('../../app/hooks', () => ({
  ...jest.requireActual('../../app/hooks'),
  useAppSelector: () => ({
    todos: [
      {
        uuid: 'abc',
        title: 'Lorem ipsum',
        note: 'Note note note',
        done: true,
      },
      {
        uuid: 'def',
        title: 'Lorem ipsum dolor',
        note: 'Note note note',
        done: false,
      },
    ],
  }),
  useAppDispatch: () => mockDispatch,
}));

describe('TodoTable', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should dispatch toggle todo', async () => {
    renderWithRedux(<TodoTable />);
    fireEvent.click(screen.getByTestId('toggle-btn-abc'));
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.toggleTodoStart({
        uuid: 'abc',
        title: 'Lorem ipsum',
        note: 'Note note note',
        done: true,
      })
    );
  });

  it('should dispatch delete todo', async () => {
    renderWithRedux(<TodoTable />);
    fireEvent.click(screen.getByTestId('delete-btn-abc'));
    fireEvent.click(screen.getByTestId('confirm-btn'));
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.deleteTodoStart({ uuid: 'abc' })
    );
  });

  it('should cancel delete todo', async () => {
    renderWithRedux(<TodoTable />);
    fireEvent.click(screen.getByTestId('delete-btn-def'));
    fireEvent.click(screen.getByTestId('cancel-btn'));
    expect(mockDispatch).not.toHaveBeenLastCalledWith(
      actions.deleteTodoStart({ uuid: 'abc' })
    );
  });
});
