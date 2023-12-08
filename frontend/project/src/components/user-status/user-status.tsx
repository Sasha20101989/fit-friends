import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getReadiessToWorkout, getRole } from '../../store/main-process/main-process.selectors';
import { changeReadiessToWorkout } from '../../store/main-process/main-process.slice';
import { Role } from '../../types/role.enum';

type UserStatusProps = {
  isFormEditable: boolean;
}

function UserStatus({isFormEditable}: UserStatusProps):JSX.Element {
  const dispatch = useAppDispatch();

  const role = useAppSelector(getRole);
  const readinessToWorkout = useAppSelector(getReadiessToWorkout);

  const handleReadinessForWorkoutChange = () => {
    dispatch(changeReadiessToWorkout(!readinessToWorkout));
  };

  return (
    <div className={`user-info${isFormEditable ? '-edit' : ''}__section user-info${isFormEditable ? '-edit' : ''}__section--status`}>
      <h2 className={`user-info${isFormEditable ? '-edit' : ''}__title user-info${isFormEditable ? '-edit' : ''}__title--status`}>Статус</h2>
      <div className={`custom-toggle custom-toggle--switch user-info${isFormEditable ? '-edit' : ''}__toggle`}>
        <label>
          <input type="checkbox" name="ready-for-training" checked={readinessToWorkout} onChange={handleReadinessForWorkoutChange}/>
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"></use>
            </svg>
          </span>
          <span className="custom-toggle__label">{ role === Role.Trainer ? 'Готов тренировать' : 'Готов к тренировке'}</span>
        </label>
      </div>
    </div>
  );
}

export default UserStatus;
