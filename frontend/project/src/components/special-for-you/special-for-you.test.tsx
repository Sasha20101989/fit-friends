import { render, screen, fireEvent } from '@testing-library/react';
import SpecialForYou from './special-for-you';
import { mockState, mockStore, trainingMock } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('SpecialForYou', () => {
  const mockTrainings = [
    trainingMock
  ];

  it('renders the SpecialForYou component with trainings and controls', () => {
    const state = mockState();
    const store = mockStore(state);

    render(<Provider store={store}>
      <MemoryRouter>
        <SpecialForYou
          specialForUserTrainings={mockTrainings}
          isPreviousButtonDisabled={false}
          isNextButtonDisabled={false}
          onPreviousClick={() => {}}
          onNextClick={() => {}}
        />
      </MemoryRouter>
    </Provider>
    );

    const titleElement = screen.getByText('Специально подобрано для вас');
    const controlsElement = screen.getByTestId('special-for-you-controls');
    const listElement = screen.getByTestId('special-for-you-list');

    expect(titleElement).toBeInTheDocument();
    expect(controlsElement).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
  });

  it('calls onPreviousClick when the previous button is clicked', () => {
    const onPreviousClickMock = jest.fn();

    const state = mockState();
    const store = mockStore(state);

    render(<Provider store={store}>
      <MemoryRouter>
        <SpecialForYou
          specialForUserTrainings={mockTrainings}
          isPreviousButtonDisabled={false}
          isNextButtonDisabled={false}
          onPreviousClick={onPreviousClickMock}
          onNextClick={() => {}}
        />
      </MemoryRouter>
    </Provider>
    );

    const previousButton = screen.getByLabelText('previous');
    fireEvent.click(previousButton);

    expect(onPreviousClickMock).toHaveBeenCalled();
  });

  it('calls onNextClick when the next button is clicked', () => {
    const onNextClickMock = jest.fn();

    const state = mockState();
    const store = mockStore(state);

    render(<Provider store={store}>
      <MemoryRouter>
        <SpecialForYou
          specialForUserTrainings={mockTrainings}
          isPreviousButtonDisabled={false}
          isNextButtonDisabled={false}
          onPreviousClick={() => {}}
          onNextClick={onNextClickMock}
        />
      </MemoryRouter>
    </Provider>
    );

    const nextButton = screen.getByLabelText('next');
    fireEvent.click(nextButton);

    expect(onNextClickMock).toHaveBeenCalled();
  });
});
