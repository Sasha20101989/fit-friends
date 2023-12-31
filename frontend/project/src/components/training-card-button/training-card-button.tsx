import React from 'react';
import { Role } from '../../types/role.enum';

type TrainingCardButtonProps = {
  role: Role;
  isSpecial: boolean;
  isFormEditable: boolean;
  onBuyClick: () => void;
  onDiscountClick: () => void;
}

function TrainingCardButton({role, isSpecial, isFormEditable, onBuyClick, onDiscountClick}: TrainingCardButtonProps): JSX.Element | null {
  function handleBuyClick(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    onBuyClick();
  }

  function handleDiscountClick(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    onDiscountClick();
  }

  if (role === Role.User) {
    return (
      <button className="btn training-info__buy" type="button" onClick={handleBuyClick}>
        Купить
      </button>
    );
  }

  if(!isSpecial && isFormEditable){
    return (
      <button className="btn-flat btn-flat--light btn-flat--underlined" type="button" onClick={handleDiscountClick}>
        <svg width="14" height="14" aria-hidden="true">
          <use xlinkHref="#icon-discount"></use>
        </svg>
        <span>Сделать скидку 10%</span>
      </button>
    );
  }

  return null;
}

export default TrainingCardButton;
