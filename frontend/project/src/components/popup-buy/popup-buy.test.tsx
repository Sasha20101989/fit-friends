import { render, screen, fireEvent } from '@testing-library/react';
import PopupBuy from './popup-buy';

describe('PopupBuy', () => {
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  it('renders PopupBuy component with correct attributes and handles form submission', () => {
    render(
      <PopupBuy
        trainingTitle="Test Training"
        trainingImage="path/to/image.jpg"
        trainingPrice={100}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
      />
    );

    expect(screen.getByText('Купить тренировку')).toBeInTheDocument();
    expect(screen.getByText('Test Training')).toBeInTheDocument();
    expect(screen.getByText('100 ₽')).toBeInTheDocument();

    const visaRadioButton = screen.getByLabelText('visa');
    fireEvent.click(visaRadioButton);

    expect(screen.getByText('Итого')).toBeInTheDocument();
    expect(screen.getByText('100 ₽')).toBeInTheDocument();
  });
});
