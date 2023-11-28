function UserStatus():JSX.Element {
  const isEdit = false;
  return (
    <div className={`user-info${isEdit && '-edit'}__section user-info${isEdit && '-edit'}__section--status`}>
      <h2 className={`user-info${isEdit && '-edit'}__title user-info${isEdit && '-edit'}__title--status`}>Статус</h2>
      <div className={`custom-toggle custom-toggle--switch user-info${isEdit && '-edit'}__toggle`}>
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
