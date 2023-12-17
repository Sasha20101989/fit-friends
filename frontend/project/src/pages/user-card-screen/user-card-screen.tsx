import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSelectedUser, getSubscribes, getTrainings } from '../../store/main-data/main-data.selectors';
import { useEffect, useMemo, useState } from 'react';
import { addToFriendsAction, addToSubscribesAction, deleteFromSubscribesAction, fetchMyFriendsAction, fetchMySubscribesAction, fetchSelectedUserAction, removeFromFriendAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { Role } from '../../types/role.enum';
import { AppRoute, MAX_TRAINER_CARD_TRAININGS_COUNT } from '../../const';
import UserCard from '../../components/user-card/user-card';
import TrainerCard from '../../components/trainer-card/trainer-card';
import { getMyFriends } from '../../store/user-process/user-process.selectors';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import GoBack from '../../components/go-back/go-back';
import Loading from '../../components/loading/loading';
import { FetchTrainingsParams, fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { Sorting } from '../../types/sorting.enum';
import { Training } from '../../types/training.type';
import { TrainingCategory } from '../../types/training-category';

function UserCardScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const friends = useAppSelector(getMyFriends);
  const subscribes = useAppSelector(getSubscribes);
  const user = useAppSelector(getSelectedUser);
  const trainings: Training[] = useAppSelector(getTrainings);

  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isInSubscribers, setIsInSubscribers] = useState<boolean>(false);
  const [selectedPage, setPage] = useState<number>(1);

  const initialQueryParams: FetchTrainingsParams = useMemo(() => ({
    category: TrainingCategory.BASE,
    createdAtDirection: Sorting.Descending,
    limit: MAX_TRAINER_CARD_TRAININGS_COUNT,
  }), []);

  useEffect(() => {
    if(id){
      dispatch(fetchSelectedUserAction(id));
      dispatch(fetchMyFriendsAction({}));
      dispatch(fetchMySubscribesAction({}));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && user?.role === Role.Trainer) {
      dispatch(fetchTrainingsAction({
        trainer: id,
        ...initialQueryParams,
        page: selectedPage,
      }));
    }
  }, [dispatch, id, selectedPage, user, initialQueryParams]);

  useEffect(() => {
    if (id && friends.length > 0) {
      setIsFriend(friends.some((friend) => friend.id === id));
    }
  }, [friends, id]);

  useEffect(() => {
    if (id && subscribes.length > 0) {
      setIsInSubscribers(subscribes.some((subscribe) => subscribe.trainer.id === id));
    }
  }, [subscribes, id]);

  const handlePreviousTrainingsClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextTrainingsClick = () => {
    setPage((prevPage) => prevPage + 1);
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

  const handleAddSubscribe = () => {
    if (id) {
      setIsInSubscribers(true);
      dispatch(addToSubscribesAction(id));
    }
  };

  const handleRemoveSubscribe = () => {
    if (id) {
      setIsInSubscribers(false);
      dispatch(deleteFromSubscribesAction(id));
    }
  };

  if(!user){
    return <Loading/>;
  }

  return(
    <Layout>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <GoBack sourceName={'btn-flat inner-page__back'} width={14} height={10} route={AppRoute.UsersCatalog}/>
            <div className="inner-page__content">
              {user.role === Role.User &&
                <UserCard
                  user={user as User}
                  isFriend={isFriend}
                  onAddFriend={handleAddFriend}
                  onRemoveFriend={handleRemoveFriend}
                />}
              {user.role === Role.Trainer &&
                <TrainerCard
                  trainer={user as Trainer}
                  trainings={trainings}
                  isFriend={isFriend}
                  isInSubscribers={isInSubscribers}
                  selectedPage={selectedPage}
                  onAddFriend={handleAddFriend}
                  onRemoveFriend={handleRemoveFriend}
                  onAddSubscribe={handleAddSubscribe}
                  onRemoveSubscribe={handleRemoveSubscribe}
                  onPreviousTrainingsClick={handlePreviousTrainingsClick}
                  onNextTrainingsClick={handleNextTrainingsClick}
                />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserCardScreen;
