function UserControls():JSX.Element {
  return (
    <div className="user-info-edit__controls">
      <button className="user-info-edit__control-btn" aria-label="обновить">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-change"></use>
        </svg>
      </button>
      <button className="user-info-edit__control-btn" aria-label="удалить">
        <svg width="14" height="16" aria-hidden="true">
          <use xlinkHref="#icon-trash"></use>
        </svg>
      </button>
    </div>
  );
}

export default UserControls;
