import { h } from 'preact';
import { useState } from 'preact/hooks';
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

import { Link, useLocation } from 'react-router-dom';

import { AuthContainer } from '@store/auth';
import { CasterContainer } from '@store/caster';

function Header() {
  const { pathname } = useLocation();

  return (
    <header class={[styles.root, { [styles.hidden]: pathname === '/login' }]}>
      <div class={styles.links}>
        <ProfileButton />
        <PageLink to={'/browse'} isActive={pathname.startsWith('/browse')} src={compass} title={'Browse'} />
        <PageLink to={'/'} isActive={pathname === '/'} src={gamepad} title={'My games'} />
        <PageLink to={'/cart'} isActive={pathname.startsWith('/cart')} src={cart} title={'Cart'} />
        <PageLink
          to={'/social?page=friends'}
          isActive={pathname.startsWith('/social')}
          src={friends}
          title={'Friends'}
        />
        <PageLink to={'/room'} isActive={pathname.startsWith('/room')} src={room} title={'Room'} />
        <PageLink to={'/settings'} isActive={pathname.startsWith('/settings')} src={cog} title={'Settings'} />
      </div>

      <CastButton />
    </header>
  );
}

const PageLink = ({ to, isActive = false, src, title }: any) => (
  <Link to={to} class={styles.pageLink}>
    <div class={styles.iconContainer}>
      <img class={{ [styles.active]: isActive }} src={src} alt={'room'} />
    </div>
    <p class={{ [styles.active]: isActive }}>{title}</p>
  </Link>
);

function ProfileButton() {
  const { user } = AuthContainer.useContainer();
  if (user === undefined || user.isAnonymous) return <PageLink to={'/login'} src={logIn} title={'Sign in'} />;

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

function CastButton() {
  const { canCast, isCasting, startCast, stopCast } = CasterContainer.useContainer();

  if (isCasting)
    return (
      <Button style={'cast'} onClick={stopCast}>
        Stop casting
      </Button>
    );

  if (canCast)
    return (
      <Button style={'cast'} onClick={startCast}>
        Start casting
      </Button>
    );
}

export default Header;
