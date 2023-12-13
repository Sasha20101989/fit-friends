import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import ThumbnailUser from '../thumbnail-user/thumbnail-user';
import { fetchUsersAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { getUsers } from '../../store/main-data/main-data.selectors';
import IconButton from '../icon-button/icon-button';
import { AppRoute, MAX_LOOK_FOR_COMPANY_COUNT } from '../../const';
import { useNavigate } from 'react-router-dom';

const LookForCompany = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(getUsers);
  const [selectedPage, setPage] = useState<number>(1);

  const handlePreviousClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleShowAllClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
      navigate(AppRoute.UsersCatalog);
  };

  useEffect(() => {
    dispatch(fetchUsersAction({
      readinessForWorkout: true,
      page: selectedPage,
      limit: MAX_LOOK_FOR_COMPANY_COUNT,
    }));
  }, [dispatch, selectedPage]);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={handleShowAllClick}>
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <IconButton sourceName={'btn-icon btn-icon--outlined look-for-company__control'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" />
              <IconButton sourceName={'btn-icon btn-icon--outlined look-for-company__control'} direction="right" onClick={handleNextClick} ariaLabel="next" />
            </div>
          </div>
          <ul className="look-for-company__list">
            {users.map((user) => (
              <ThumbnailUser key={user.email} user={user} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LookForCompany;
