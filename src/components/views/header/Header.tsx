import { h } from 'preact';
import { useState } from 'preact/hooks';
import classnames from 'classnames';
import styles from './Header.module.scss';

import search from '@assets/icons/search.svg';
import friends from '@assets/icons/users.svg';
import notifications from '@assets/icons/bell.svg';
import logIn from '@assets/icons/log-in.svg';
import gamepad from '@assets/icons/gamepad.svg';
import compass from '@assets/icons/compass.svg';

import FriendsMenu from './menus/FriendsMenu/FriendsMenu';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

import type firebase from 'firebase';
import { Link } from 'react-router-dom';

type Props = {
  user: firebase.User | undefined;
};

const Header = (props: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const { user } = props;
  return (
    <header className={classnames(styles.root)}>
      <div className={classnames(styles.logo)} />
      <div className={classnames(styles.links)}>
        <Link to={'/browse'}>
          <div className={styles.pageLink}>
            <img src={compass} alt={'My games'} />
            <p>Browse</p>
          </div>{' '}
        </Link>
        <Link to={'/'}>
          <div className={styles.pageLink}>
            <img src={gamepad} alt={'My games'} />
            <p>My games</p>
          </div>
        </Link>
      </div>
      <div className={classnames(styles.actions)}>
        <div>
          <button
            className={classnames(styles.headerAction)}
            onKeyPress={(e: any) =>
              e.key === 'Enter' &&
              setActiveMenu(activeMenu === 'search' ? '' : 'search')
            }
            onMouseDown={() =>
              setActiveMenu(activeMenu === 'search' ? '' : 'search')
            }
          >
            <img src={search} alt={'search'} />
          </button>
        </div>

        {/* Friends menu */}

        <div>
          <button
            className={classnames(styles.headerAction)}
            onKeyPress={(e: any) =>
              e.key === 'Enter' &&
              setActiveMenu(activeMenu === 'friends' ? '' : 'friends')
            }
            onMouseDown={() =>
              setActiveMenu(activeMenu === 'friends' ? '' : 'friends')
            }
          >
            <img src={friends} alt={'friends'} />
          </button>
          {activeMenu === 'friends' && (
            <FriendsMenu setMenuState={setActiveMenu} />
          )}
        </div>

        {/* Notifications menu */}

        <div>
          <button
            className={classnames(styles.headerAction)}
            onKeyPress={(e: any) =>
              e.key === 'Enter' &&
              setActiveMenu(
                activeMenu === 'notifications' ? '' : 'notifications',
              )
            }
            onMouseDown={() =>
              setActiveMenu(
                activeMenu === 'notifications' ? '' : 'notifications',
              )
            }
          >
            <img src={notifications} alt={'notifications'} />
          </button>
        </div>

        {/* Profile button */}

        {user && user.isAnonymous ? (
          <a href={'/login'}>
            <button className={classnames(styles.headerAction)}>
              <p>Sign in</p> <img src={logIn} alt={'log-in'} />
            </button>
          </a>
        ) : (
          <div>
            <button
              className={classnames(styles.headerAction)}
              onKeyPress={(e: any) =>
                e.key === 'Enter' &&
                setActiveMenu(activeMenu === 'profile' ? '' : 'profile')
              }
              onMouseDown={() =>
                setActiveMenu(activeMenu === 'profile' ? '' : 'profile')
              }
            >
              <p>{user?.displayName}</p>
              <div className={classnames(styles.imageContainer)}>
                <img
                  src={(user !== undefined && user?.photoURL) || ''}
                  alt={'user'}
                />
              </div>
            </button>
            {activeMenu === 'profile' && (
              <ProfileMenu setMenuState={setActiveMenu} />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
