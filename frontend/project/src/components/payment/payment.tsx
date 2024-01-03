import { memo } from 'react';
import { PaymentMethod } from '../../types/payment-method.enum';

type PopupBuyProps = {
  selectedPayment: PaymentMethod | null;
  onPaymentChange: (value: React.SetStateAction<PaymentMethod | null>) => void;
}

function Payment({selectedPayment, onPaymentChange}: PopupBuyProps): JSX.Element {

  const handlePaymentChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value as PaymentMethod;
    onPaymentChange(value);
  };

  const renderPaymentMethodLogo = (method: PaymentMethod): JSX.Element => {
    switch (method) {
      case PaymentMethod.Visa:
        return <svg width="58" height="20" aria-hidden="true"><use xlinkHref="#visa-logo"></use></svg>;
      case PaymentMethod.Mir:
        return <svg width="66" height="20" aria-hidden="true"><use xlinkHref="#mir-logo"></use></svg>;
      case PaymentMethod.UMoney:
        return <svg width="106" height="24" aria-hidden="true"><use xlinkHref="#iomoney-logo"></use></svg>;
    }
  };

  return(
    <section className="payment-method" data-testid="payment-method">
      <h4 className="payment-method__title">Выберите способ оплаты</h4>
      <ul className="payment-method__list">
        {Object.values(PaymentMethod).map((method) => (
          <li key={method} className="payment-method__item">
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name="payment-purchases"
                  value={method}
                  aria-label={method}
                  checked={method === selectedPayment}
                  onChange={handlePaymentChange}
                />
                <span className="btn-radio-image__image">
                  {renderPaymentMethodLogo(method)}
                </span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(Payment);
