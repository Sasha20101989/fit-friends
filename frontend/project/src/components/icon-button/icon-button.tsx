type IconButtonProps = {
  direction: string;
  onClick: () => void;
  ariaLabel: string;
}

function IconButton({ direction, onClick, ariaLabel }: IconButtonProps): JSX.Element {
  const arrowIcon = direction === 'left' ? 'arrow-left' : 'arrow-right';

  return (
    <button
      className={'btn-icon special-for-you__control'}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg width="16" height="14" aria-hidden="true">
        <use xlinkHref={`#${arrowIcon}`}></use>
      </svg>
    </button>
  );
}

export default IconButton;
