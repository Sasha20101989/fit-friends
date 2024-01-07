import { render, screen } from '@testing-library/react';
import SpecialOffers from './special-offers';
import { trainingMock } from '../../utils/mocks';

describe('SpecialOffers', () => {
  const mockTrainings = [
    trainingMock
  ];

  it('renders the SpecialOffers component with PromoSlider when there are trainings', () => {
    render(<SpecialOffers specialTrainings={mockTrainings} activeSlide={0} onDotClick={jest.fn()} />);

    const promoSliderElement = screen.getByTestId('special-offers-list');
    expect(promoSliderElement).toBeInTheDocument();
  });

  it('renders the SpecialOffers component with ThumbnailSpecGym when there are no trainings', () => {
    render(<SpecialOffers specialTrainings={[]} activeSlide={0} onDotClick={jest.fn()} />);

    const thumbnailSpecGymElement = screen.getByTestId('thumbnail-spec-gym');
    expect(thumbnailSpecGymElement).toBeInTheDocument();
  });
});
