import { screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import renderWithRedux from '../../utils/test';

import { actions } from './actions';
import Toast from './Toast';

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
    show: true,
    header: 'Toast header',
    body: 'Toast body',
  }),
  useAppDispatch: () => mockDispatch,
}));

describe('Toast', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('render', async () => {
    renderWithRedux(<Toast />);
    expect(screen.getByText('Toast header')).toBeInTheDocument();
    expect(screen.getByText('Toast body')).toBeInTheDocument();
  });
});
