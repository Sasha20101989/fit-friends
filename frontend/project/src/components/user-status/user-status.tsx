function UserStatus():JSX.Element {
  return (
    <div className="user-info-edit__section user-info-edit__section--status">
      <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
      <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
        <label>
          <input type="checkbox" name="ready-for-training"/>
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"></use>
            </svg>
          </span>
          <span className="custom-toggle__label">Готов тренировать</span>
        </label>
      </div>
    </div>
  );
}

export default UserStatus;
