import { useEffect, useState } from 'react';
import Image from '../image/image';
import { PaymentMethod } from '../../types/payment-method.enum';
import Payment from '../payment/payment';
import { PurchaseType } from '../../types/purchase-type.enum';
import ProductQuantity from '../product-quantity/product-quantity';

type PopupBuyProps = {
  trainingTitle: string;
  trainingImage: string;
  trainingPrice: number;
  onClose: () => void;
  onSubmit: (purchaseType: PurchaseType, quantity: number, paymentMethod: PaymentMethod) => void;
}

function PopupBuy({trainingTitle, trainingImage, trainingPrice, onClose, onSubmit}: PopupBuyProps): JSX.Element {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    setTotal(trainingPrice * selectedQuantity);
  }, [trainingPrice, selectedQuantity, selectedPayment]);

  const formatCurrency = (value: number) => (
    value.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    })
  );

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    if(selectedPayment !== null && selectedQuantity > 0){
      onSubmit(PurchaseType.Subscription, selectedQuantity, selectedPayment);
    }
  };

  return(
    <div className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <Image sourceName={'popup__product-image'} imageSrc={trainingImage} width={98} height={80} alt={'тренировка'} />
              <div className="popup__product-info">
                <h3 className="popup__product-title">{trainingTitle}</h3>
                <p className="popup__product-price">{`${trainingPrice} ₽`}</p>
              </div>
            </div>
            <ProductQuantity selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />
            <Payment selectedPayment={selectedPayment} onPaymentChange={setSelectedPayment} />
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{formatCurrency(total)}</p>
            </div>
            <div className="popup__button">
              <button className="btn" type="button" onClick={handleSubmit}>
                Купить
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupBuy;
