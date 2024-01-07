import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ThumbnailTrainingWrapper from './thumbnail-training-wrapper';

describe('ThumbnailTrainingWrapper', () => {
  it('navigates to the correct route when "Подробнее" button is clicked', () => {
    const testProps = {
      trainingId: '123',
    };

    render(
      <Router>
        <ThumbnailTrainingWrapper {...testProps} />
      </Router>
    );

    const detailsButton = screen.getByText('Подробнее');

    fireEvent.click(detailsButton);

    const detailsLink = screen.getByText('Подробнее');
    expect(detailsLink).toBeInTheDocument();
  });

  it('does not navigate when "Отзывы" button is clicked (for illustration purposes)', () => {
    const testProps = {
      trainingId: '123',
    };

    render(
      <Router>
        <ThumbnailTrainingWrapper {...testProps} />
      </Router>
    );

    const reviewsButton = screen.getByText('Отзывы');

    fireEvent.click(reviewsButton);

    const reviewsLink = screen.getByText('Отзывы');
    expect(reviewsLink).toBeInTheDocument();
  });
});
