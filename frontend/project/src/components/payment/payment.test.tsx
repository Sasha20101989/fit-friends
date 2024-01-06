import { render, screen, fireEvent } from '@testing-library/react';
import Payment from './payment';
import { PaymentMethod } from '../../types/payment-method.enum';

describe('Payment', () => {
  it('renders Payment component with correct attributes and handles payment change', () => {
    const selectedPayment: PaymentMethod | null = PaymentMethod.Visa;
    const onPaymentChangeMock = jest.fn();

    render(
      <Payment
        selectedPayment={selectedPayment}
        onPaymentChange={onPaymentChangeMock}
      />
    );

    expect(screen.getByText('Выберите способ оплаты')).toBeInTheDocument();
    expect(screen.getByLabelText('visa')).toBeInTheDocument();
    expect(screen.getByLabelText('mir')).toBeInTheDocument();
    expect(screen.getByLabelText('umoney')).toBeInTheDocument();

    const selectedRadio = screen.getByLabelText('visa');

    expect(selectedRadio instanceof HTMLInputElement).toBe(true);

    const uMoneyRadio = screen.getByLabelText('umoney');
    fireEvent.click(uMoneyRadio);

    expect(onPaymentChangeMock).toHaveBeenCalledWith(PaymentMethod.UMoney);
  });
});
