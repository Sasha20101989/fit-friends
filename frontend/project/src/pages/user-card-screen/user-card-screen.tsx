import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import HashtagList from '../../components/hashtag-list/hashtag-list';
import { getSelectedUser } from '../../store/main-data/main-data.selectors';
import { useEffect } from 'react';
import { fetchSelectedUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { Role } from '../../types/role.enum';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import { AppRoute } from '../../const';

function UserCardScreen() : JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if(id){
      dispatch(fetchSelectedUserAction(id));
    }
  }, [dispatch, id]);

  const user = useAppSelector(getSelectedUser);

  const handleGoCatalog = (): void => {
    navigate(AppRoute.UsersCatalog);
  };

  if(!user){
    return <NotFoundScreen/>;
  }

  let name, location, description, workoutTypes, role;
  let readinessForWorkout;

  if (user.role === Role.User) {
    const currentUser = user as User;
    name = currentUser.name;
    location = currentUser.location;
    description = currentUser.description;
    workoutTypes = currentUser.workoutTypes;
    role = currentUser.role;
    readinessForWorkout = currentUser.readinessForWorkout;
  } else {
    const currentTrainer = user as Trainer;
    name = currentTrainer.name;
    location = currentTrainer.location;
    description = currentTrainer.description;
    workoutTypes = currentTrainer.workoutTypes;
    role = currentTrainer.role;
    //personalTraining = currentTrainer.personalTraining;
  }

  const hashtags = workoutTypes;

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
              <section className="user-card">
                {role === Role.User ?
                  <h1 className="visually-hidden">Карточка пользователя</h1> :
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>}
                <div className="user-card__wrapper">
                  <div className="user-card__content">
                    <div className="user-card__head">
                      <h2 className="user-card__title">{name}</h2>
                    </div>
                    <div className="user-card__label">
                      <Link to="">
                        <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <span>{location}</span>
                      </Link>
                    </div>
                    {role === Role.Trainer && readinessForWorkout &&
                      <div className="user-card-coach__status-container">
                        <div className="user-card-coach__status user-card-coach__status--tag">
                          <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-cup"></use>
                          </svg>
                          <span>{role}</span>
                        </div>
                        {readinessForWorkout ?
                          <div className="user-card-coach__status user-card-coach__status--check">
                            <span>Готов тренировать</span>
                          </div> :
                          <div className="user-card-coach-2__status user-card-coach-2__status--check">
                            <span>Не готов тренировать</span>
                          </div>}
                      </div>}
                    {role === Role.User && readinessForWorkout &&
                      <div className="user-card__status">
                        <span>Готов к тренировке</span>
                      </div>}
                    <div className="user-card__text">
                      {description && <p>{description}</p>}
                    </div>
                    {role === Role.Trainer &&
                      <button className="btn-flat user-card-coach-2__sertificate" type="button">
                        <svg width="12" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-teacher"></use>
                        </svg>
                        <span>Посмотреть сертификаты</span>
                      </button>}
                    <HashtagList
                      classType={'user-card__hashtag-list'}
                      hashtagClassType={'user-card__hashtag-item'}
                      hashtagItemClassType={'hashtag'}
                      hashtags={hashtags}
                    />
                    <button className="btn user-card__btn" type="button">Добавить в друзья</button>
                  </div>
                  <div className="user-card__gallary">
                    <ul className="user-card__gallary-list">
                      <li className="user-card__gallary-item">
                        <img src="img/content/user-card-photo1.jpg" srcSet="img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1"/>
                      </li>
                      <li className="user-card__gallary-item">
                        <img src="img/content/user-card-photo2.jpg" srcSet="img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2"/>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserCardScreen;
