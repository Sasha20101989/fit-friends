import React from 'react';
import { useAppSelector } from '../../hooks/index';
import { getCurrentRole } from '../../store/main-process/main-process.selectors';
import { Role } from '../../types/role.enum';

type TrainingCardButtonProps = {
  onBuyClick: () => void;
}

function TrainingCardButton({onBuyClick}: TrainingCardButtonProps): JSX.Element {
  const currentRole = useAppSelector(getCurrentRole);

  function handleBuyClick(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    onBuyClick();
  }

  if (currentRole === Role.User) {
    return (
      <button className="btn training-info__buy" type="button" onClick={handleBuyClick}>
        Купить
      </button>
    );
  }

  return (
    <button className="btn-flat btn-flat--light btn-flat--underlined" type="button">
      <svg width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-discount"></use>
      </svg>
      <span>Сделать скидку 10%</span>
    </button>
  );
}

export default TrainingCardButton;
