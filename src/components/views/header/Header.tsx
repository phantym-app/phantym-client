import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Header.module.scss';

import friends from '@assets/icons/users.svg';
import notifications from '@assets/icons/bell.svg';
import logIn from '@assets/icons/log-in.svg';

import FriendsMenu from './menus/FriendsMenu/FriendsMenu';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';
import type firebase from 'firebase';
import { Link } from 'react-router-dom';

type Props = {
  user: firebase.User | undefined;
};

function Header({ user }: Props) {
  const [activeMenu, setActiveMenu] = useState('');

  const makeHandleKeyPress = (menu: string) =>
    function (e: any) {
      if (e.key === 'Enter') setActiveMenu(activeMenu === menu ? '' : menu);
    };

  const makeHandleMouseDown = (menu: string) =>
    function (e: any) {
      setActiveMenu(activeMenu === menu ? '' : menu);
    };

  return (
    <header class={styles.root}>
      <div class={styles.logo} />
      <div class={styles.links}>
        <Link to={'/browse'}>
          <p>Browse</p>
        </Link>
        <Link to={'/'}>
          <p>My games</p>
        </Link>
      </div>
      <div class={styles.actions}>
        {/* Friends menu */}

        <div>
          <button
            class={styles.headerAction}
            onKeyPress={makeHandleKeyPress('friends')}
            onMouseDown={makeHandleMouseDown('friends')}>
            <img src={friends} alt={'friends'} />
          </button>
          {activeMenu === 'friends' && <FriendsMenu setMenuState={setActiveMenu} />}
        </div>

        {/* Notifications menu */}

        <div>
          <button
            class={styles.headerAction}
            onKeyPress={makeHandleKeyPress('notifications')}
            onMouseDown={makeHandleMouseDown('notifications')}>
            <img src={notifications} alt={'notifications'} />
          </button>
        </div>

        {/* Profile button */}

        {user && user.isAnonymous ? (
          <a href={'/login'}>
            <button class={styles.headerAction}>
              <p>Sign in</p> <img src={logIn} alt={'log-in'} />
            </button>
          </a>
        ) : (
          <div>
            <button
              class={styles.headerAction}
              onKeyPress={makeHandleKeyPress('profile')}
              onMouseDown={makeHandleMouseDown('profile')}>
              <p>{user?.displayName}</p>
              <div class={styles.imageContainer}>
                <img src={(user !== undefined && user?.photoURL) || ''} alt={'user'} />
              </div>
            </button>
            {activeMenu === 'profile' && <ProfileMenu setMenuState={setActiveMenu} />}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
