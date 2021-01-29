import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

import cog from '@assets/icons/cog.svg';
import social from '@assets/icons/users.svg';
import room from '@assets/icons/grid.svg';
import logIn from '@assets/icons/log-in.svg';
import gamepad from '@assets/icons/gamepad.svg';
import compass from '@assets/icons/compass.svg';
import cart from '@assets/icons/shopping-cart.svg';
import cast from '@assets/icons/cast.svg';

import Button from '@components/elements/button/Button';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';
import Hamburger from '@components/elements/hamburger/Hamburger';

import { Link } from 'react-router-dom';

import { AuthContainer } from '@store/auth';
import { useHeader } from './HeaderState';

const PageLink = ({ to, isActive, imageSrc, title }: any) => (
  <Link to={to} class={[styles.pageLink, { [styles.active]: isActive }]}>
    <div class={styles.iconContainer}>
      <img src={imageSrc} alt={'room'} />
    </div>
    <p>{title}</p>
  </Link>
);

function Header() {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const { pathname } = useLocation();
  const { user } = AuthContainer.useContainer();
  const { visibility, setVisibility, isCollapsed, setCollapsed } = useHeader();

  return (
    <header class={[styles.root, { [styles.hidden]: pathname === '/login', [styles.collapsed]: isCollapsed }]}>
      <div class={styles.links}>
        <div class={styles.title}>
          <Hamburger isActive={!isCollapsed} onClick={() => setCollapsed(!isCollapsed)} />
        </div>
        {/* Profile button */}
        {user === undefined || user.isAnonymous ? (
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
                <img src={user?.photoURL || ''} alt={'user'} />
                <div class={[styles.profileVisibility, { [styles.visible]: visibility }]} />
              </div>
              <p>{user?.displayName}</p>
            </button>
            {activeMenu === 'profile' && (
              <ProfileMenu
                isCollapsed={isCollapsed}
                hideMenu={() => setActiveMenu('')}
                visible={visibility}
                setVisible={setVisibility}
              />
            )}
          </div>
        )}

        <PageLink to={'/browse'} isActive={pathname.startsWith('/browse')} imageSrc={compass} title={'Browse'} />
        <PageLink to={'/'} isActive={pathname === '/'} imageSrc={gamepad} title={'My games'} />
        <PageLink to={'/cart'} isActive={pathname.startsWith('/cart')} imageSrc={cart} title={'Cart'} />
        <PageLink
          to={'/social?page=friends'}
          isActive={pathname.startsWith('/social')}
          imageSrc={social}
          title={'Social'}
        />
        <PageLink to={'/room'} isActive={pathname.startsWith('/room')} imageSrc={room} title={'Room'} />
        <PageLink to={'/settings'} isActive={pathname.startsWith('/settings')} imageSrc={cog} title={'Settings'} />
      </div>
      <Button>
        <div class={styles.buttonInner}>
          <div class={styles.iconContainer}>
            <img src={cast} alt={'cast'} />
          </div>
          <p>Start casting</p>
        </div>
      </Button>
    </header>
  );
}

export default Header;
