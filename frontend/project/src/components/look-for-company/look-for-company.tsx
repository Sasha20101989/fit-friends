import { useAppDispatch } from '../../hooks/index';
import ThumbnailUser from '../thumbnail-user/thumbnail-user';
import IconButton from '../icon-button/icon-button';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { setUsers } from '../../store/main-data/main-data.slice';
import { User } from '../../types/user.interface';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import { memo } from 'react';

type LookForCompanyProps = {
  lookForCompanyUsers: User[];
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  onPreviousClick: (value: React.SetStateAction<number>) => void;
  onNextClick: (value: React.SetStateAction<number>) => void;
}

const LookForCompany = ({lookForCompanyUsers, isPreviousButtonDisabled, isNextButtonDisabled, onPreviousClick, onNextClick}: LookForCompanyProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePreviousClick = () => {
    onPreviousClick((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    onNextClick((prevPage) => prevPage + 1);
  };

  const handleShowAllClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    dispatch(setUsers([]));
    navigate(AppRoute.UsersCatalog);
  };

  return (
    <section className="look-for-company" data-testid="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={(evt) => handleShowAllClick(evt)}>
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <IconButton sourceName={'btn-icon btn-icon--outlined look-for-company__control'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" width={16} height={14} disabled={isPreviousButtonDisabled}/>
              <IconButton sourceName={'btn-icon btn-icon--outlined look-for-company__control'} direction="right" onClick={handleNextClick} ariaLabel="next" width={16} height={14} disabled={isNextButtonDisabled}/>
            </div>
          </div>
          {lookForCompanyUsers.length > 0 ?
            <ul className="look-for-company__list" data-testid="look-for-company-users">
              {lookForCompanyUsers.map((user) => (
                <ThumbnailUser
                  sourceName={'look-for-company__item'}
                  childSourceName={'thumbnail-user thumbnail-user--role-user thumbnail-user--dark'}
                  buttonSourceName={'btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button'}
                  key={user.email}
                  user={user}
                />
              ))}
            </ul> :
            <ThumbnailSpecGym/>}
        </div>
      </div>
    </section>
  );
};

export default memo(LookForCompany);
