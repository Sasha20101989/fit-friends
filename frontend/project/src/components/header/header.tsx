import { Link } from 'react-router-dom';

type NavItem = {
  to: string;
  label: string;
  icon: string;
  width: number;
  height: number;
}

function Header (): JSX.Element {
  const navItems: NavItem[] = [
    { to: '/', label: 'На главную', icon: '#icon-home', width: 18, height: 18 },
    { to: '/profile', label: 'Личный кабинет', icon: '#icon-user', width: 16, height: 18 },
    { to: '/friends', label: 'Друзья', icon: '#icon-friends', width: 22, height: 16 },
    { to: '/notifications', label: 'Уведомления', icon: '#icon-notification', width: 14, height: 18, },
  ];

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
                <Link className={`main-nav__link ${index === 0 ? 'is-active' : ''}`} to={item.to} aria-label={item.label}>
                  <svg width={item.width} height={item.height} aria-hidden="true">
                    <use xlinkHref={item.icon}></use>
                  </svg>
                </Link>
                {index === navItems.length - 1 && (
                  <div className="main-nav__dropdown">
                    <p className="main-nav__label">{item.label}</p>
                    <ul className="main-nav__sublist">
                      <li className="main-nav__subitem">
                        <Link className="notification is-active" to="">
                          <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                          <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time>
                        </Link>
                      </li>
                      <li className="main-nav__subitem">
                        <Link className="notification is-active" to="">
                          <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                          <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time>
                        </Link>
                      </li>
                      <li className="main-nav__subitem">
                        <Link className="notification is-active" to="">
                          <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                          <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time>
                        </Link>
                      </li>
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

export default Header;
