import Layout from '../../components/layout/layout';
import { useEffect, useState } from 'react';
import { UserQueryParams, fetchUsersAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getUsers } from '../../store/main-data/main-data.selectors';
import ThumbnailUser from '../../components/thumbnail-user/thumbnail-user';
import { WorkoutType } from '../../types/workout-type.enum';
import Filter from '../../components/filter/filter';
import { Location } from '../../types/location.enum';
import { Sorting } from '../../types/sorting.enum';
import RadioItem from '../../components/radio-item/radio-item';
import { AppRoute, MAX_USERS_COUNT, capitalizeFirstLetter } from '../../const';
import { TrainingLevel } from '../../types/training-level.enum';
import { Role } from '../../types/role.enum';
import GoBack from '../../components/go-back/go-back';
import ShowMore from '../../components/show-more/show-more';

function UsersCatalogScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const users = useAppSelector(getUsers);

  const initialQueryParams: UserQueryParams = {
    createdAtDirection: Sorting.Descending,
    limit: MAX_USERS_COUNT,
  };

  const [queryParams, setQueryParams] = useState<UserQueryParams>(initialQueryParams);
  const [selectedLevel, setLevel] = useState<TrainingLevel | null>(null);
  const [sortingOption, setSortingOption] = useState<Role | null>(null);

  const handleShowMoreClick = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      limit: (prevParams.limit || 0) + MAX_USERS_COUNT,
    }));
  };

  const handleFilterChange = (filterName: string, values: (Location | WorkoutType)[]) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      location: filterName === 'location' ? values as Location[] : prevParams.location,
      workoutTypes: filterName === 'spezialization' ? values as WorkoutType[] : prevParams.workoutTypes,
    }));
  };

  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const newLevel = evt.currentTarget.value as TrainingLevel;
    setLevel(newLevel);
    setQueryParams((prevParams) => ({
      ...prevParams,
      trainingLevel: newLevel,
    }));
  };

  const handleSortingChange = (option: Role) => {
    setSortingOption(option);
    setQueryParams((prevParams) => ({
      ...prevParams,
      sortBy: option,
      createdAtDirection: undefined
    }));
  };

  useEffect(() => {
    dispatch(fetchUsersAction(queryParams));
  }, [dispatch, queryParams]);

  return(
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог пользователей</h1>
            <div className="user-catalog-form">
              <h2 className="visually-hidden">Каталог пользователя</h2>
              <div className="user-catalog-form__wrapper">
                <GoBack sourceName={'btn-flat btn-flat--underlined user-catalog-form__btnback'} width={14} height={10} route={AppRoute.Main}/>
                <h3 className="user-catalog-form__title">Фильтры</h3>
                <form className="user-catalog-form__form">
                  <Filter title="Локация, станция метро" filterName="location" values={Object.values(Location)} onFilterChange={handleFilterChange}/>
                  <Filter title="Специализация" filterName="spezialization" values={Object.values(WorkoutType)} onFilterChange={handleFilterChange}/>
                  <div className="user-catalog-form__block user-catalog-form__block--level">
                    <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                    <div className="custom-toggle-radio">
                      {Object.values(TrainingLevel).map((level) => (
                        <RadioItem
                          key={level}
                          classType={'custom-toggle-radio__block'}
                          name={'user-agreement'}
                          value={capitalizeFirstLetter(level) as TrainingLevel}
                          selectedValue={selectedLevel}
                          onValueChange={handleLevelChange}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="user-catalog-form__block">
                    <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                    <div className="btn-radio-sort">
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          onChange={() => handleSortingChange(Role.Trainer)}
                          checked={sortingOption === Role.Trainer}
                        />
                        <span className="btn-radio-sort__label">Тренеры</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          onChange={() => handleSortingChange(Role.User)}
                          checked={sortingOption === Role.User}
                        />
                        <span className="btn-radio-sort__label">Пользователи</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="inner-page__content">
              <div className="users-catalog">
                <ul className="users-catalog__list">
                  {users.map((user) => (
                    <ThumbnailUser
                      key={user.email}
                      sourceName={'users-catalog__item'}
                      childSourceName={`thumbnail-user thumbnail-user--role-${user.role === Role.Trainer ? 'coach' : 'user'}`}
                      buttonSourceName={`btn ${user.role === Role.Trainer ? 'btn--dark-bg' : ''} btn--medium thumbnail-user__button`}
                      user={user}
                    />
                  ))}
                </ul>
                <div className="show-more users-catalog__show-more">
                  {users.length > 0 && queryParams.limit && users.length % queryParams.limit === 0 && (
                    <ShowMore onShowMoreClick={handleShowMoreClick}/>
                  )}
                  <button className="btn show-more__button show-more__button--to-top" type="button">
                    Вернуться в начало
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default UsersCatalogScreen;
