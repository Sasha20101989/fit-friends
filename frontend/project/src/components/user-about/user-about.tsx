import { USERNAME_CONSTRAINTS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getDescription, getName } from '../../store/main-process/main-process.selectors';
import { setDescription, setName } from '../../store/main-process/main-process.slice';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

type UserAboutProps = {
  isFormEditable: boolean;
  error: string;
}

function UserAbout({isFormEditable, error}: UserAboutProps):JSX.Element {
  const dispatch = useAppDispatch();
  const name = useAppSelector(getName);
  const description = useAppSelector(getDescription);

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(evt.target.value));
  };

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDescription(evt.target.value));
  };

  return (
    <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
      <h2 className={`user-info${isFormEditable ? '-edit' : ''}__title`}>Обо мне</h2>
      <div className={`custom-input ${!isFormEditable ? 'custom-input--readonly' : ''} user-info${isFormEditable ? '-edit' : ''}__input`}>
        <label>
          <span className="custom-input__label">Имя</span>
          <span className="custom-input__wrapper">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              disabled={!isFormEditable}
              required
              minLength={USERNAME_CONSTRAINTS.MIN_LENGTH}
              maxLength={USERNAME_CONSTRAINTS.MAX_LENGTH}
            />
          </span>
        </label>
      </div>
      <div className={`custom-textarea ${!isFormEditable ? 'custom-textarea--readonly' : ''} user-info${isFormEditable ? '-edit' : ''}__textarea`}>
        <label>
          <span className="custom-textarea__label">Описание</span>
          <textarea
            name="description"
            placeholder=" "
            value={description ?? ''}
            onChange={handleDescriptionChange}
            disabled={!isFormEditable}
            required
          >
          </textarea>
          {error && <span style={errorStyle}>{error}</span>}
        </label>
      </div>
    </div>
  );
}

export default UserAbout;
