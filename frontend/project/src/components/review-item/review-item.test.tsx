import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { Review } from '../../types/review.type';
import { initialUserState, trainingMock } from '../../utils/mocks';

describe('ReviewItem', () => {
  const mockReview: Review = {
    user: {...initialUserState, name: 'Sasha', avatar: 'avatar.jpg'},
    rating: 4,
    createdAt: '20101989',
    training: trainingMock,
    text: 'This is a test review.',
  };

  it('renders with correct content', () => {
    render(<ReviewItem review={mockReview} />);

    const userName = screen.getByText('Sasha');
    expect(userName).toBeInTheDocument();

    const ratingValue = screen.getByText('4');
    expect(ratingValue).toBeInTheDocument();

    const commentText = screen.getByText('This is a test review.');
    expect(commentText).toBeInTheDocument();
  });
});
