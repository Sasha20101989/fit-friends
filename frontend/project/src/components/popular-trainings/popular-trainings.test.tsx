import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PopularTrainings from './popular-trainings';
import { trainingMock } from '../../utils/mocks';
import { Training } from '../../types/training.type';

describe('PopularTrainings', () => {
  it('renders PopularTrainings component with correct attributes when there are trainings', () => {
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
    const popularList = screen.getByTestId('popular-trainings-list');
    expect(popularList).toBeInTheDocument();
  });

  it('renders PopularTrainings component with correct attributes when there are no trainings', () => {
    const onPreviousClickMock = jest.fn();
    const onNextClickMock = jest.fn();

    const popularTrainings: Training[] = [];

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
    const thumbnail = screen.getByTestId('thumbnail-spec-gym');
    expect(thumbnail).toBeInTheDocument();
  });
});
