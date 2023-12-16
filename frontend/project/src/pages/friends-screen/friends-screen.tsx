import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { UserQueryParams, fetchMyFriendsAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { getMyFriends } from '../../store/user-process/user-process.selectors';
import Friend from '../../components/friend/friend';
import { AppRoute, MAX_USERS_COUNT } from '../../const';
import GoBack from '../../components/go-back/go-back';
import ShowMore from '../../components/show-more/show-more';
import { Sorting } from '../../types/sorting.enum';

function FriendsScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const friends = useAppSelector(getMyFriends);

  const initialQueryParams: UserQueryParams = {
    createdAtDirection: Sorting.Descending,
    limit: MAX_USERS_COUNT,
  };

  const [queryParams, setQueryParams] = useState<UserQueryParams>(initialQueryParams);

  const handleShowMoreClick = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      limit: (prevParams.limit || 0) + MAX_USERS_COUNT,
    }));
  };

  useEffect(() => {
    dispatch(fetchMyFriendsAction(queryParams));
  }, [dispatch]);

  return(
    <Layout>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <GoBack sourceName={'btn-flat friends-list__back'} width={14} height={10} route={AppRoute.Main}/>
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
              {/* <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                <label>
                  <input type="checkbox" value="user-agreement-1" name="user-agreement"><span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg></span><span className="custom-toggle__label">Только онлайн</span>
                </label>
              </div> */}
            </div>
            <ul className="friends-list__list">
              {friends.map((friend) => (
                <Friend key={friend.email} friend={friend}/>
              ))}
            </ul>
            <div className="show-more friends-list__show-more">
              <ShowMore onShowMoreClick={handleShowMoreClick}/>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default FriendsScreen;
