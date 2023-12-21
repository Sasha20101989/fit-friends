import React from 'react';
import { useAppSelector } from '../../hooks/index';
import { Role } from '../../types/role.enum';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';

type TrainingCardButtonProps = {
  isSpecial: boolean;
  isFormEditable: boolean;
  onBuyClick: () => void;
  onDiscountClick: () => void;
}

function TrainingCardButton({isSpecial, isFormEditable, onBuyClick, onDiscountClick}: TrainingCardButtonProps): JSX.Element | null {
  const currentUser = useAppSelector(getCurrentUser);

  if(!currentUser){
    return null;
  }

  function handleBuyClick(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    onBuyClick();
  }

  function handleDiscountClick(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    onDiscountClick();
  }

  if (currentUser.role === Role.User) {
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
