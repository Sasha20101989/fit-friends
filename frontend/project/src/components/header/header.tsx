import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSelectedPage } from '../../store/main-process/main-process.selectors';
import { AppRoute } from '../../const';
import { Role } from '../../types/role.enum';
import { Page } from '../../types/page.enum';
import { setSelectedPage } from '../../store/main-process/main-process.slice';
import { memo, useEffect, useMemo } from 'react';
import { deleteFromNotificationsAction, fetchNotificationsAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { getNotifications } from '../../store/main-data/main-data.selectors';
import { formatCustomDateTimeString, formatDateString } from '../../utils/util';
import { removeNotification } from '../../store/main-data/main-data.slice';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';

type NavItem = {
  to: string;
  label: Page;
  icon: string;
  width: number;
  height: number;
}

function Header (): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const selectedPage = useAppSelector(getSelectedPage);

  const notifications = useAppSelector(getNotifications);

  const currentUser = useAppSelector(getCurrentUser);

  const navItems: NavItem[] = useMemo(() => {
    if(currentUser && currentUser.id){
      return [
        { to: `${currentUser.role === Role.Trainer ? `${AppRoute.TrainerRoom}/${currentUser.id}` : AppRoute.Main}`, label: Page.MAIN, icon: '#icon-home', width: 18, height: 18 },
        { to: `${currentUser.role === Role.Trainer ? `${AppRoute.TrainerRoom}/${currentUser.id}` : `${AppRoute.UserRoom}/${currentUser.id}`}`, label: Page.ROOM, icon: '#icon-user', width: 16, height: 18 },
        { to: `${currentUser.role === Role.Trainer ? `${AppRoute.TrainerFriends}/${currentUser.id}` : `${AppRoute.UserFriends}/${currentUser.id}`}`, label: Page.FRIENDS, icon: '#icon-friends', width: 22, height: 16 },
        { to: '', label: Page.NOTIFICATIONS, icon: '#icon-notification', width: 14, height: 18, },
      ];
    }

    return [];
  }, [currentUser]);

  useEffect(() => {
    const currentItem = navItems.find((item) => item.to === location.pathname);

    if (currentItem?.label !== selectedPage) {
      dispatch(setSelectedPage(currentItem?.label));
      dispatch(fetchNotificationsAction());
    }
  }, [dispatch, navItems, location.pathname, selectedPage, notifications]);

  const handleNavItemClick = (page: Page) => {
    if(page !== Page.NOTIFICATIONS){
      dispatch(setSelectedPage(page));
    }
  };

  const handleNotificationClick = (notificationId: string | undefined) => {
    if(notificationId){
      dispatch(removeNotification(notificationId));
      dispatch(deleteFromNotificationsAction(notificationId));
    }
  };

  return(
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {navItems.map((item, index) => (
              <li key={item.label} className={`main-nav__item ${index === navItems.length - 1 ? 'main-nav__item--notifications' : ''}`}>
                <Link
                  className={`main-nav__link ${item.label === selectedPage ? 'is-active' : ''}`}
                  to={item.to}
                  aria-label={item.label}
                  onClick={() => handleNavItemClick(item.label)}
                >
                  <svg width={item.width} height={item.height} aria-hidden="true">
                    <use xlinkHref={item.icon}></use>
                  </svg>
                </Link>
                {index === navItems.length - 1 && (
                  <div className="main-nav__dropdown">
                    <p className="main-nav__label">{item.label}</p>
                    <ul className="main-nav__sublist">
                      {notifications.map((notification) => (
                        <li key={`${notification.createdAt}-${notification.text}`} className="main-nav__subitem">
                          <Link className="notification is-active" to="" onClick={ () => handleNotificationClick(notification.id)}>
                            <p className="notification__text">{notification.text}</p>
                            <time className="notification__time" dateTime={formatCustomDateTimeString(notification.createdAt)}>{formatDateString(notification.createdAt)}</time>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search"/>
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item">
                <Link className="search__link" to="">Бокс</Link>
              </li>
              <li className="search__item"><Link className="search__link is-active" to="">Бег</Link></li>
              <li className="search__item"><Link className="search__link" to="">Аэробика</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
              <li className="search__item"><Link className="search__link" to="">Text</Link></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
