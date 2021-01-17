import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Link, useLocation } from 'react-router-dom';

import FriendsMenu from './menus/FriendsMenu/FriendsMenu';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

import friends from '@assets/icons/users.svg';
import notifications from '@assets/icons/bell.svg';
import logIn from '@assets/icons/log-in.svg';

import styles from './Header.module.scss';

import { AuthContainer } from '@store/auth';

function Header() {
  const { user } = AuthContainer.useContainer();
  const { pathname } = useLocation();
  const [activeMenu, setActiveMenu] = useState('');

  return (
    <header class={[styles.root, { [styles.hidden]: pathname === '/login' }]}>
      <div class={styles.logo} />

      <div class={styles.links}>
        <Link to={'/browse'} onMouseEnter={() => import('@routes/Browse')}>
          <p>Browse</p>
        </Link>
        <Link to={'/'} onMouseEnter={() => import('@routes/Home')}>
          <p>My games</p>
        </Link>
      </div>

      <div class={styles.actions}>
        {/* Friends menu */}

        <ActionButton menu={'friends'} setActiveMenu={setActiveMenu} activeMenu={activeMenu} subMenu={FriendsMenu}>
          <img src={friends} alt={'friends'} />
        </ActionButton>

        {/* Notifications menu */}

        <ActionButton menu={'notifications'} setActiveMenu={setActiveMenu} activeMenu={activeMenu}>
          <img src={notifications} alt={'notifications'} />
        </ActionButton>

        {/* Profile button */}

        {user === undefined || user.isAnonymous ? (
          <Link to={'/login'} onMouseEnter={() => import('@routes/Login')}>
            <button class={styles.headerAction}>
              <p>Sign in</p> <img src={logIn} alt={'log-in'} />
            </button>
          </Link>
        ) : (
          <ActionButton menu={'profile'} setActiveMenu={setActiveMenu} activeMenu={activeMenu} subMenu={ProfileMenu}>
            <p>{user.displayName}</p>
            <div class={styles.imageContainer}>
              <img src={(user !== undefined && user?.photoURL) || ''} alt={'user'} />
            </div>
          </ActionButton>
        )}
      </div>
    </header>
  );
}

const ActionButton = ({ menu, children, setActiveMenu, activeMenu, subMenu: SubMenu }: any) => (
  <div>
    <button
      class={styles.headerAction}
      onKeyPress={function (e: any) {
        if (e.key === 'Enter') setActiveMenu(activeMenu === menu ? '' : menu);
      }}
      onMouseDown={function (e: any) {
        setActiveMenu(activeMenu === menu ? '' : menu);
      }}>
      {children}
    </button>
    {SubMenu !== undefined && activeMenu === menu && <SubMenu hideMenu={() => setActiveMenu('')} />}
  </div>
);

export default Header;
