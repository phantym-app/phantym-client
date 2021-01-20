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

import Button from '@components/elements/button/Button';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

import { Link } from 'react-router-dom';

import { AuthContainer } from '@store/auth';

function Header() {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const { pathname } = useLocation();
  const { user } = AuthContainer.useContainer();

  const PageLink = ({ to, isActive, imageSrc, children }: any) => (
    <Link to={to} class={styles.pageLink}>
      <div class={styles.iconContainer}>
        <img class={{ [styles.active]: isActive }} src={imageSrc} alt={'room'} />
      </div>
      <p class={{ [styles.active]: isActive }}>{children}</p>
    </Link>
  );

  return (
    <header class={[styles.root, { [styles.hidden]: pathname === '/login' }]}>
      <div class={styles.links}>
        {/* Profile button */}
        {user && user.isAnonymous ? (
          <Link to={'/login'}>
            <button class={styles.pageLink}>
              <div class={styles.iconContainer}>
                <img src={logIn} alt={'log-in'} />
              </div>
              <p>Sign in</p>
            </button>
          </Link>
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

        <PageLink to={'/browse'} isActive={pathname.startsWith('/browse')} imageSrc={compass}>
          Browse
        </PageLink>

        <PageLink to={'/'} isActive={pathname === '/'} imageSrc={gamepad}>
          My games
        </PageLink>

        <PageLink to={'/cart'} isActive={pathname.startsWith('/cart')} imageSrc={cart}>
          Cart
        </PageLink>

        <PageLink to={'/social?page=friends'} isActive={pathname.startsWith('/social')} imageSrc={friends}>
          Friends
        </PageLink>

        <PageLink to={'/room'} isActive={pathname.startsWith('/room')} imageSrc={room}>
          Room
        </PageLink>

        <PageLink to={'/settings'} isActive={pathname.startsWith('/settings')} imageSrc={cog}>
          Settings
        </PageLink>
      </div>
      <Button style={'cast'}>Start casting</Button>
    </header>
  );
}

export default Header;
