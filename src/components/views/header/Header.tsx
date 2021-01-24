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
import { CasterContainer } from '@store/caster';

const PageLink = ({ to, isActive = false, imageSrc, title }: any) => (
  <Link to={to} class={styles.pageLink}>
    <div class={styles.iconContainer}>
      <img class={{ [styles.active]: isActive }} src={imageSrc} alt={'room'} />
    </div>
    <p class={{ [styles.active]: isActive }}>{title}</p>
  </Link>
);

function ProfileButton({ user }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function _toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div class={styles.profileMenu}>
      <button class={styles.pageLink} onKeyPress={e => e.key === 'Enter' && _toggle()} onMouseDown={_toggle}>
        <div class={styles.iconContainer}>
          <img src={user?.photoURL || ''} alt={'user'} />
        </div>

        <p>{user?.displayName}</p>
      </button>

      {isOpen && <ProfileMenu hideMenu={() => setIsOpen(false)} />}
    </div>
  );
}

function Header() {
  const { pathname } = useLocation();
  const { user } = AuthContainer.useContainer();
  const { receiverIsAvailable, sendCast, isCasting, stopCast } = CasterContainer.useContainer();

  function handleCast(e) {
    if (isCasting) stopCast();
    else sendCast();
  }

  return (
    <header class={[styles.root, { [styles.hidden]: pathname === '/login' }]}>
      <div class={styles.links}>
        {user === undefined || user.isAnonymous ? (
          <PageLink to={'/login'} imageSrc={logIn} title={'Sign in'} />
        ) : (
          <ProfileButton user={user} />
        )}

        <PageLink to={'/browse'} isActive={pathname.startsWith('/browse')} imageSrc={compass} title={'Browse'} />
        <PageLink to={'/'} isActive={pathname === '/'} imageSrc={gamepad} title={'My games'} />
        <PageLink to={'/cart'} isActive={pathname.startsWith('/cart')} imageSrc={cart} title={'Cart'} />
        <PageLink
          to={'/social?page=friends'}
          isActive={pathname.startsWith('/social')}
          imageSrc={friends}
          title={'Friends'}
        />
        <PageLink to={'/room'} isActive={pathname.startsWith('/room')} imageSrc={room} title={'Room'} />
        <PageLink to={'/settings'} isActive={pathname.startsWith('/settings')} imageSrc={cog} title={'Settings'} />
      </div>

      {receiverIsAvailable && (
        <Button style={'cast'} onClick={handleCast}>
          Start casting
        </Button>
      )}
    </header>
  );
}

export default Header;
