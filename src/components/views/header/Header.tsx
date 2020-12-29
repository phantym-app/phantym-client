import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Header.module.scss';

import cog from '@assets/icons/cog.svg';
import friends from '@assets/icons/users.svg';
import room from '@assets/icons/grid.svg';
import logIn from '@assets/icons/log-in.svg';
import gamepad from '@assets/icons/gamepad.svg';
import compass from '@assets/icons/compass.svg';
import cart from '@assets/icons/shopping-cart.svg';

import activeCog from '@assets/icons/activeCog.svg';
import activeFriends from '@assets/icons/activeUsers.svg';
import activeRoom from '@assets/icons/activeGrid.svg';
import activeGamepad from '@assets/icons/activeGamepad.svg';
import activeCompass from '@assets/icons/activeCompass.svg';
import activeCart from '@assets/icons/activeShoppingcart.svg';

import Button from '../../elements/button/Button';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

import type firebase from 'firebase';
import { Link } from 'react-router-dom';

type Props = {
  user: firebase.User | undefined;
};

const Header = (props: Props) => {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [activePage, setActivePage] = useState<string>('');
  const { user } = props;

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, [useLocation().pathname]);

  return (
    <header className={classnames(styles.root)}>
      <div className={classnames(styles.links)}>
        {/* Profile button */}

        {user && user.isAnonymous ? (
          <a href={'/login'}>
            <button className={classnames(styles.pageLink)}>
              <div className={classnames(styles.iconContainer)}>
                <img src={logIn} alt={'log-in'} />
              </div>
              <p>Sign in</p>
            </button>
          </a>
        ) : (
          <div className={classnames(styles.profileMenu)}>
            <button
              className={classnames(styles.pageLink)}
              onKeyPress={(e: any) =>
                e.key === 'Enter' &&
                setActiveMenu(activeMenu === 'profile' ? '' : 'profile')
              }
              onMouseDown={() =>
                setActiveMenu(activeMenu === 'profile' ? '' : 'profile')
              }
            >
              <div className={classnames(styles.iconContainer)}>
                <img
                  src={(user !== undefined && user?.photoURL) || ''}
                  alt={'user'}
                />
              </div>
              <p>{user?.displayName}</p>
            </button>
            {activeMenu === 'profile' && (
              <ProfileMenu setMenuState={setActiveMenu} />
            )}
          </div>
        )}

        {/* Browse button */}

        <Link to={'/browse'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img
              src={activePage === '/browse' ? activeCompass : compass}
              alt={'Browse'}
            />
          </div>
          <p
            className={classnames({
              [styles.active]: activePage === '/browse',
            })}
          >
            Browse
          </p>
        </Link>

        {/* My games button */}

        <Link to={'/'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img
              src={activePage === '/' ? activeGamepad : gamepad}
              alt={'My games'}
            />
          </div>
          <p
            className={classnames({
              [styles.active]: activePage === '/',
            })}
          >
            My games
          </p>
        </Link>

        {/* Cart button */}

        <Link to={'/cart'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img
              src={activePage === '/cart' ? activeCart : cart}
              alt={'cart'}
            />
          </div>
          <p
            className={classnames({
              [styles.active]: activePage === '/cart',
            })}
          >
            Cart
          </p>
        </Link>

        {/* Friends button */}

        <Link
          to={'/social?page=friends'}
          className={classnames(styles.pageLink)}
        >
          <div className={classnames(styles.iconContainer)}>
            <img
              src={activePage === '/friends' ? activeFriends : friends}
              alt={'friends'}
            />
          </div>
          <p
            className={classnames({
              [styles.active]: activePage === '/friends',
            })}
          >
            Friends
          </p>
        </Link>

        {/* Room button */}

        <Link to={'/room'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img
              src={activePage === '/room' ? activeRoom : room}
              alt={'room'}
            />
          </div>
          <p
            className={classnames({
              [styles.active]: activePage === '/room',
            })}
          >
            Room
          </p>
        </Link>

        {/* Settings button */}

        <Link to={'/settings'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img
              src={activePage === '/settings' ? activeCog : cog}
              alt={'settings'}
            />
          </div>
          <p
            className={classnames({
              [styles.active]: activePage === '/settings',
            })}
          >
            Settings
          </p>
        </Link>
      </div>
      <Button style={'cast'}>Start casting</Button>
    </header>
  );
};

export default Header;
