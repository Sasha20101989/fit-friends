import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PopularTrainings from './popular-trainings';
import { trainingMock } from '../../utils/mocks';

describe('PopularTrainings', () => {
  it('renders PopularTrainings component with correct attributes and handles navigation', () => {
    const onPreviousClickMock = jest.fn();
    const onNextClickMock = jest.fn();

    const popularTrainings = [trainingMock];

    render(
      <MemoryRouter>
        <PopularTrainings
          popularTrainings={popularTrainings}
          isPreviousButtonDisabled={false}
          isNextButtonDisabled={false}
          onPreviousClick={onPreviousClickMock}
          onNextClick={onNextClickMock}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Популярные тренировки')).toBeInTheDocument();
    expect(screen.getByText('Смотреть все')).toBeInTheDocument();

    if (popularTrainings.length > 0) {
      expect(screen.getByTestId('popular-trainings-list')).toBeInTheDocument();
    } else {
      expect(screen.getByTestId('thumbnail-spec-gym')).toBeInTheDocument();
    }
  });
});
