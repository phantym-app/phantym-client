import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'react-router-dom';
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

import Button from '@components/elements/button/Button';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

import { Link } from 'react-router-dom';

import { AuthContainer } from '@store/auth';

function Header() {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const { pathname } = useLocation();
  const { user } = AuthContainer.useContainer();

  const PageLink = ({ to, activeImage, inactiveImage, children }: any) => (
    <Link to={to} class={styles.pageLink}>
      <div class={styles.iconContainer}>
        <img src={pathname.startsWith(to) ? activeImage : inactiveImage} alt={'room'} />
      </div>
      <p class={{ [styles.active]: pathname.startsWith(to) }}>{children}</p>
    </Link>
  );

  return (
    <header class={styles.root}>
      <div class={styles.links}>
        {/* Profile button */}
        {user && user.isAnonymous ? (
          <a href={'/login'}>
            <button class={styles.pageLink}>
              <div class={styles.iconContainer}>
                <img src={logIn} alt={'log-in'} />
              </div>
              <p>Sign in</p>
            </button>
          </a>
        ) : (
          <div class={styles.profileMenu}>
            <button
              class={styles.pageLink}
              onKeyPress={(e: any) => e.key === 'Enter' && setActiveMenu(activeMenu === 'profile' ? '' : 'profile')}
              onMouseDown={() => setActiveMenu(activeMenu === 'profile' ? '' : 'profile')}>
              <div class={styles.iconContainer}>
                <img src={(user !== undefined && user?.photoURL) || ''} alt={'user'} />
              </div>
              <p>{user?.displayName}</p>
            </button>
            {activeMenu === 'profile' && <ProfileMenu hideMenu={() => setActiveMenu('')} />}
          </div>
        )}

        {/* Browse button */}
        <Link to={'/browse'} class={styles.pageLink}>
          <div class={styles.iconContainer}>
            <img src={pathname.startsWith('/browse') ? activeCompass : compass} alt={'Browse'} />
          </div>
          <p
            class={{
              [styles.active]: pathname.startsWith('/browse'),
            }}>
            Browse
          </p>
        </Link>

        {/* My games button */}
        <Link to={'/'} class={styles.pageLink}>
          <div class={styles.iconContainer}>
            <img src={pathname === '/' ? activeGamepad : gamepad} alt={'My games'} />
          </div>
          <p
            class={{
              [styles.active]: pathname === '/',
            }}>
            My games
          </p>
        </Link>

        {/* Cart button */}
        <Link to={'/cart'} class={styles.pageLink}>
          <div class={styles.iconContainer}>
            <img src={pathname.startsWith('/cart') ? activeCart : cart} alt={'cart'} />
          </div>
          <p
            class={{
              [styles.active]: pathname.startsWith('/cart'),
            }}>
            Cart
          </p>
        </Link>

        {/* Friends button */}
        <Link to={'/social?page=friends'} class={styles.pageLink}>
          <div class={styles.iconContainer}>
            <img src={pathname.startsWith('/social') ? activeFriends : friends} alt={'social'} />
          </div>
          <p
            class={{
              [styles.active]: pathname.startsWith('/social'),
            }}>
            Friends
          </p>
        </Link>

        {/* Room button */}
        <Link to={'/room'} class={styles.pageLink}>
          <div class={styles.iconContainer}>
            <img src={pathname.startsWith('/room') ? activeRoom : room} alt={'room'} />
          </div>
          <p
            class={{
              [styles.active]: pathname.startsWith('/room'),
            }}>
            Room
          </p>
        </Link>

        {/* Settings button */}
        <Link to={'/settings'} class={styles.pageLink}>
          <div class={styles.iconContainer}>
            <img src={pathname.startsWith('/settings') ? activeCog : cog} alt={'settings'} />
          </div>
          <p
            class={{
              [styles.active]: pathname.startsWith('/settings'),
            }}>
            Settings
          </p>
        </Link>
      </div>
      <Button style={'cast'}>Start casting</Button>
    </header>
  );
}

export default Header;
