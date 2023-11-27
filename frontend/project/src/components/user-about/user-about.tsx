function UserAbout():JSX.Element {
  return (
    <div className="user-info-edit__section">
      <h2 className="user-info-edit__title">Обо мне</h2>
      <div className="custom-input user-info-edit__input">
        <label>
          <span className="custom-input__label">Имя</span>
          <span className="custom-input__wrapper">
            <input type="text" name="name" defaultValue="Валерия"/>
          </span>
        </label>
      </div>
      <div className="custom-textarea user-info-edit__textarea">
        <label><span className="custom-textarea__label">Описание</span>
          <textarea name="description" defaultValue="Персональный тренер и инструктор групповых программ с опытом  более 4х лет. Специализация: коррекция фигуры и осанки, снижение веса, восстановление после травм, пилатес." placeholder=" "></textarea>
        </label>
      </div>
    </div>
  );
}

export default UserAbout;
