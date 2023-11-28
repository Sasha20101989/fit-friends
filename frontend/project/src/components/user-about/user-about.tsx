function UserAbout():JSX.Element {
  const isEdit: boolean = false;
  return (
    <div className={`user-info${isEdit && '-edit'}__section`}>
      <h2 className={`user-info${isEdit && '-edit'}__title`}>Обо мне</h2>
      <div className={`custom-input ${!isEdit && 'custom-input--readonly'} user-info${isEdit && '-edit'}__input`}>
        <label>
          <span className="custom-input__label">Имя</span>
          <span className="custom-input__wrapper">
            <input type="text" name="name" defaultValue="Валерия" disabled={!isEdit}/>
          </span>
        </label>
      </div>
      <div className={`custom-textarea ${!isEdit && 'custom-textarea--readonly'} user-info${isEdit && '-edit'}__textarea`}>
        <label><span className="custom-textarea__label">Описание</span>
          <textarea name="description" defaultValue="Персональный тренер и инструктор групповых программ с опытом  более 4х лет. Специализация: коррекция фигуры и осанки, снижение веса, восстановление после травм, пилатес." placeholder=" " disabled={!isEdit}></textarea>
        </label>
      </div>
    </div>
  );
}

export default UserAbout;
