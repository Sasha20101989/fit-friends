type IconButtonProps = {
  sourceName: string;
  direction: string;
  onClick: () => void;
  ariaLabel: string;
}

function IconButton({ sourceName, direction, onClick, ariaLabel }: IconButtonProps): JSX.Element {
  const arrowIcon = direction === 'left' ? 'arrow-left' : 'arrow-right';

  return (
    <button
      className={sourceName}
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
