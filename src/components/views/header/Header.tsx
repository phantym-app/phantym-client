import { h } from 'preact';
import { useState } from 'preact/hooks';
import classnames from 'classnames';
import styles from './Header.module.scss';

import cog from '@assets/icons/cog.svg';
import friends from '@assets/icons/users.svg';
import room from '@assets/icons/grid.svg';
import logIn from '@assets/icons/log-in.svg';
import gamepad from '@assets/icons/gamepad.svg';
import compass from '@assets/icons/compass.svg';
import cart from '@assets/icons/shopping-cart.svg';

import Button from '../../elements/button/Button';
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
            <img src={compass} alt={'My games'} />
          </div>
          <p>Browse</p>
        </Link>

        {/* My games button */}

        <Link to={'/'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img src={gamepad} alt={'My games'} />
          </div>
          <p>My games</p>
        </Link>

        {/* Cart button */}

        <Link to={'/cart'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img src={cart} alt={'cart'} />
          </div>
          <p>Cart</p>
        </Link>

        {/* Friends button */}

        <Link
          to={'/social?page=friends'}
          className={classnames(styles.pageLink)}
        >
          <div className={classnames(styles.iconContainer)}>
            <img src={friends} alt={'friends'} />
          </div>
          <p>Friends</p>
        </Link>

        {/* Room button */}

        <Link to={'/'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img src={room} alt={'My games'} />
          </div>
          <p>Room</p>
        </Link>

        {/* Settings button */}

        <Link to={'/'} className={classnames(styles.pageLink)}>
          <div className={classnames(styles.iconContainer)}>
            <img src={cog} alt={'My games'} />
          </div>
          <p>Settings</p>
        </Link>
      </div>
      <Button style={'cast'}>Start casting</Button>
    </header>
  );
};

export default Header;
