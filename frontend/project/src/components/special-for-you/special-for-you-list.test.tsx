import { render, screen } from '@testing-library/react';
import SpecialForYouList from './special-for-you-list';
import { mockState, mockStore, trainingMock } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

describe('SpecialForYouList', () => {
  const mockTrainings = [
    trainingMock
  ];

  it('renders SpecialForYouItem components for each training when trainings are provided', () => {
    const state = mockState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpecialForYouList specialForUserTrainings={mockTrainings} />
        </MemoryRouter>
      </Provider>
    );

    const trainingElements = screen.getAllByTestId('special-for-you-item');
    expect(trainingElements).toHaveLength(mockTrainings.length);
  });

  it('renders ThumbnailSpecGym when no trainings are provided', () => {
    const state = mockState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpecialForYouList specialForUserTrainings={[]} />
        </MemoryRouter>
      </Provider>
    );

    const thumbnailSpecGymElement = screen.getByTestId('thumbnail-spec-gym');
    expect(thumbnailSpecGymElement).toBeInTheDocument();
  });
});
