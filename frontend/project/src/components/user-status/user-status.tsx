import { useAppDispatch } from '../../hooks/index';
import { changeCurrentUserReadiessToWorkout } from '../../store/user-process/user-process.slice';
import { Role } from '../../types/role.enum';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

type UserStatusProps = {
  isFormEditable: boolean;
  currentUser: User | Trainer;
}

function UserStatus({isFormEditable, currentUser}: UserStatusProps):JSX.Element | null {
  const dispatch = useAppDispatch();

  let readness;

  if(currentUser.role === Role.User){
    const user = currentUser as User;
    readness = user.readinessForWorkout;
  }else if(currentUser.role === Role.Trainer){
    const trainer = currentUser as Trainer;
    readness = trainer.personalTraining;
  }

  const handleReadinessForWorkoutChange = () => {
    if(isFormEditable){
      if(currentUser.role === Role.User){
        const user = currentUser as User;
        readness = !user.readinessForWorkout;
        dispatch(changeCurrentUserReadiessToWorkout(!user.readinessForWorkout));
      }else if(currentUser.role === Role.Trainer){
        const trainer = currentUser as Trainer;
        readness = !trainer.personalTraining;
        dispatch(changeCurrentUserReadiessToWorkout(!trainer.personalTraining));
      }
    }
  };

  return (
    <div className={`user-info${isFormEditable ? '-edit' : ''}__section user-info${isFormEditable ? '-edit' : ''}__section--status`}>
      <h2 className={`user-info${isFormEditable ? '-edit' : ''}__title user-info${isFormEditable ? '-edit' : ''}__title--status`}>Статус</h2>
      <div className={`custom-toggle custom-toggle--switch user-info${isFormEditable ? '-edit' : ''}__toggle`}>
        <label>
          <input type="checkbox" name="ready-for-training" checked={readness} onChange={handleReadinessForWorkoutChange}/>
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"></use>
            </svg>
          </span>
          <span className="custom-toggle__label">{ currentUser.role === Role.Trainer ? 'Готов тренировать' : 'Готов к тренировке'}</span>
        </label>
      </div>
    </div>
  );
}

export default UserStatus;
