import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getSelectedUser } from '../../store/main-data/main-data.selectors';
import { useEffect, useState } from 'react';
import { addToFriendsAction, fetchMyFriendsAction, fetchSelectedUserAction, removeFromFriendAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { Role } from '../../types/role.enum';
import { AppRoute } from '../../const';
import UserCard from '../../components/user-card/user-card';
import TrainerCard from '../../components/trainer-card/trainer-card';
import { getMyFriends } from '../../store/user-process/user-process.selectors';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';

function UserCardScreen() : JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const friends = useAppSelector(getMyFriends);
  const user = useAppSelector(getSelectedUser);

  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    if(id){
      dispatch(fetchSelectedUserAction(id));
      dispatch(fetchMyFriendsAction({}));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && friends.length > 0) {
      setIsFriend(friends.some((friend) => friend.id === id));
    }
  }, [friends, id]);

  const handleGoCatalog = (): void => {
    navigate(AppRoute.UsersCatalog);
  };

  const handleAddFriend = () => {
    if (id) {
      setIsFriend(true);
      dispatch(addToFriendsAction(id));
    }
  };

  const handleRemoveFriend = () => {
    if (id) {
      setIsFriend(false);
      dispatch(removeFromFriendAction(id));
    }
  };

  if(!user){
    return <NotFoundScreen/>;
  }

  return(
    <Layout>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <button className="btn-flat inner-page__back" type="button" onClick={handleGoCatalog}>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
              <span>Назад</span>
            </button>
            <div className="inner-page__content">
              {user.role === Role.User && <UserCard user={user as User} isFriend={isFriend} onAddFriend={handleAddFriend} onRemoveFriend={handleRemoveFriend}/>}
              {user.role === Role.Trainer && <TrainerCard trainer={user as Trainer} isFriend={isFriend} onAddFriend={handleAddFriend} onRemoveFriend={handleRemoveFriend}/>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserCardScreen;
