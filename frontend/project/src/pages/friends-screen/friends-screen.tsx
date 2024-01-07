import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { UserQueryParams, fetchMyFriendsAction, removeFromFriendAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import Friend from '../../components/friend/friend';
import { AppRoute, MAX_USERS_COUNT } from '../../const';
import GoBack from '../../components/go-back/go-back';
import ShowMore from '../../components/show-more/show-more';
import { Sorting } from '../../types/sorting.enum';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import Loading from '../../components/loading/loading';
import { getRequests } from '../../store/request-data/request-data.selectors';
import { fetchRequestsAction, updateRequestStatusAction } from '../../store/api-actions/request-api-actions/request-api-actions';
import { Request } from '../../types/request.type';
import { RequestType } from '../../types/request-type.enum';
import { RequestStatus } from '../../types/request-status.enum';

function FriendsScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const initialQueryParams: UserQueryParams = {
    createdAtDirection: Sorting.Descending,
    limit: MAX_USERS_COUNT,
  };

  const [queryParams, setQueryParams] = useState<UserQueryParams>(initialQueryParams);

  useEffect(() => {
    dispatch(fetchMyFriendsAction(queryParams));
    dispatch(fetchRequestsAction());
  }, [dispatch, queryParams]);

  const currentUser = useAppSelector(getCurrentUser);
  const requests = useAppSelector(getRequests);

  const handleShowMoreClick = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      limit: (prevParams.limit || 0) + MAX_USERS_COUNT,
    }));
  };

  const handleAccept = (evt: React.MouseEvent<HTMLButtonElement>, request: Request) => {
    evt.preventDefault();

    if(request.id){
      dispatch(updateRequestStatusAction({requestId: request.id, status: RequestStatus.Accepted}));
    }
  };

  const handleReject = (evt: React.MouseEvent<HTMLButtonElement>, request: Request) => {
    evt.preventDefault();

    if(request.id && request.initiator?.id && request.requestType === RequestType.Friend){
      dispatch(removeFromFriendAction(request.initiator.id))
        .then(() => {
          dispatch(fetchRequestsAction());
          dispatch(fetchMyFriendsAction(queryParams));
        });
      dispatch(updateRequestStatusAction({requestId: request.id, status: RequestStatus.Rejected}));
    }
  };

  if(!currentUser?.friends){
    return <Loading/>;
  }

  return(
    <Layout>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <GoBack sourceName={'btn-flat friends-list__back'} width={14} height={10} route={AppRoute.Main}/>
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
            </div>
            <ul className="friends-list__list">
              {currentUser.friends.map((friend) => {
                const friendRequest = requests.find((request) => request.initiator?.id === friend.id);
                return (<Friend key={friend.email} friend={friend} request={friendRequest} onAccept={handleAccept} onReject={handleReject}/>);
              })}
            </ul>
            <ShowMore sourceName={'show-more friends-list__show-more'} length={currentUser.friends.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default FriendsScreen;
