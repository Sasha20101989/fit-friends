type IconButtonProps = {
  sourceName: string;
  direction: string;
  onClick: () => void;
  ariaLabel: string;
  width: number;
  height: number;
  disabled: boolean;
}

function IconButton({ sourceName, direction, onClick, ariaLabel, width, height, disabled = false }: IconButtonProps): JSX.Element {
  const arrowIcon = direction === 'left' ? 'arrow-left' : 'arrow-right';

  return (
    <button
      className={sourceName}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      <svg width={width} height={height} aria-hidden="true">
        <use xlinkHref={`#${arrowIcon}`}></use>
      </svg>
    </button>
  );
}

export default IconButton;
