import { render, screen } from '@testing-library/react';
import PersonalAccountCoach from './personal-account-coach';
import { MemoryRouter } from 'react-router-dom';

describe('PersonalAccountCoach', () => {
  it('renders PersonalAccountCoach component with correct attributes', () => {
    const userId = '123';
    const certificates = ['Certificate 1', 'Certificate 2'];
    const isPreviousButtonDisabled = false;
    const isNextButtonDisabled = false;
    const onPreviousClick = jest.fn();
    const onNextClick = jest.fn();

    render(
      <MemoryRouter>
        <PersonalAccountCoach
          userId={userId}
          certificates={certificates}
          isPreviousButtonDisabled={isPreviousButtonDisabled}
          isNextButtonDisabled={isNextButtonDisabled}
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Создать тренировку')).toBeInTheDocument();
    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
  });
});
