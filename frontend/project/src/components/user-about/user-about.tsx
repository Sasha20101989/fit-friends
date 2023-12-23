import { USERNAME_CONSTRAINTS } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { setCurrentUserDescription, setCurrentUserName } from '../../store/user-process/user-process.slice';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

type UserAboutProps = {
  isFormEditable: boolean;
  error: string;
  currentUser: User | Trainer;
}

function UserAbout({isFormEditable, error, currentUser}: UserAboutProps):JSX.Element {
  const dispatch = useAppDispatch();

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentUserName(evt.target.value));
  };

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCurrentUserDescription(evt.target.value));
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
              value={currentUser.name}
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
            value={currentUser.description ?? ''}
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
