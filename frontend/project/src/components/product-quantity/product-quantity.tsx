type ProductQuantityProps = {
  selectedQuantity: number;
  onQuantityChange: (value: React.SetStateAction<number>) => void;
}

function ProductQuantity({selectedQuantity, onQuantityChange}: ProductQuantityProps): JSX.Element {
  const handleIncrement = () => {
    onQuantityChange((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    onQuantityChange((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div className="popup__product-quantity">
      <p className="popup__quantity">Количество</p>
      <div className="input-quantity">
        <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus" onClick={handleDecrement}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <div className="input-quantity__input">
          <label>
            <input type="text" value={selectedQuantity} size={2} readOnly />
          </label>
        </div>
        <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus" onClick={handleIncrement}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProductQuantity;
