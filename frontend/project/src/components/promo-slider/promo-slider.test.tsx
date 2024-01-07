import { render, screen } from '@testing-library/react';
import PromoSlider from './promo-slider';
import { trainingMock } from '../../utils/mocks';

const mockSpecialTrainings = [
  trainingMock
];

describe('PromoSlider', () => {
  it('renders with correct content', () => {
    const activeSlide = 0;
    const onDotClickMock = jest.fn();

    render(
      <PromoSlider
        specialTrainings={mockSpecialTrainings}
        activeSlide={activeSlide}
        onDotClick={onDotClickMock}
      />
    );

    expect(screen.getByTestId('special-offers-list')).toBeInTheDocument();
  });
});
