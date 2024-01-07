import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Role } from '../../types/role.enum';
import TrainingCardButton from './training-card-button';

describe('TrainingCardButton', () => {
  const mockProps = {
    role: Role.User,
    isSpecial: false,
    isFormEditable: true,
    onBuyClick: jest.fn(),
    onDiscountClick: jest.fn(),
  };

  it('renders TrainingCardButton component for User role', () => {
    render(
      <Router>
        <TrainingCardButton {...mockProps} />
      </Router>
    );

    const buyButton = screen.getByText('Купить');
    expect(buyButton).toBeInTheDocument();
  });

  it('renders TrainingCardButton component for Trainer role with discount button', () => {
    const mockTrainerProps = {
      role: Role.Trainer,
      isSpecial: false,
      isFormEditable: true,
      onBuyClick: jest.fn(),
      onDiscountClick: jest.fn(),
    };

    render(
      <Router>
        <TrainingCardButton {...mockTrainerProps} />
      </Router>
    );

    const discountButton = screen.getByText('Сделать скидку 10%');
    expect(discountButton).toBeInTheDocument();
  });

  it('handles "Купить" button click', () => {
    render(
      <Router>
        <TrainingCardButton {...mockProps} />
      </Router>
    );

    const buyButton = screen.getByText('Купить');
    fireEvent.click(buyButton);

    expect(mockProps.onBuyClick).toHaveBeenCalled();
  });

  it('handles "Сделать скидку 10%" button click', () => {
    const mockTrainerProps = {
      role: Role.Trainer,
      isSpecial: false,
      isFormEditable: true,
      onBuyClick: jest.fn(),
      onDiscountClick: jest.fn(),
    };

    render(
      <Router>
        <TrainingCardButton {...mockTrainerProps} />
      </Router>
    );

    const discountButton = screen.getByText('Сделать скидку 10%');
    fireEvent.click(discountButton);

    expect(mockTrainerProps.onDiscountClick).toHaveBeenCalled();
  });
});
