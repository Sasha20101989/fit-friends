import { render, screen, fireEvent } from '@testing-library/react';
import PopupRateList from './popup-rate-list';

describe('PopupRateList', () => {
  const onRatingChangeMock = jest.fn();

  it('renders PopupRateList component with correct attributes and handles rating change', () => {
    const selectedRating = 3;

    render(
      <PopupRateList selectedRating={selectedRating} onRatingChange={onRatingChangeMock} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText('оценка 3.')).toBeInTheDocument();
    expect(screen.getByLabelText('оценка 5.')).toBeInTheDocument();
  });
});
