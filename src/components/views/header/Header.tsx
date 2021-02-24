import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Header.module.scss';

import Icon from '@components/elements/icon';
import Button from '@components/elements/button/Button';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';
import Hamburger from '@components/elements/hamburger/Hamburger';

import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '@store/auth';
import { useCast } from '@store/cast';
import { maxDesktop, maxMobile } from '@logic/matchesWidth';

function Header() {
  const [isCollapsed, setCollapsed] = useState<boolean>(maxDesktop);
  const { pathname } = useLocation();

  return (
    <header
      class={[
        styles.root,
        {
          [styles.hidden]: pathname === '/login',
          [styles.collapsed]: isCollapsed,
          [styles.mobile]: maxMobile,
        },
      ]}>
      <div class={styles.links}>
        <div class={styles.title}>
          <Hamburger isActive={!isCollapsed} onClick={() => setCollapsed(!isCollapsed)} />
        </div>

        <ProfileButton isCollapsed={isCollapsed} />
        <PageLink to={'/browse'} isActive={pathname.startsWith('/browse')} variant={'compass'} title={'Browse'} />
        <PageLink to={'/'} isActive={pathname === '/'} variant={'gamepad'} title={'My games'} />
        <PageLink to={'/cart'} isActive={pathname.startsWith('/cart')} variant={'shopping-cart'} title={'Cart'} />
        <PageLink
          to={'/social?page=friends'}
          isActive={pathname.startsWith('/social')}
          variant={'users'}
          title={'Social'}
        />
        <PageLink to={'/room'} isActive={pathname.startsWith('/room')} variant={'grid'} title={'Room'} />
        <PageLink to={'/settings'} isActive={pathname.startsWith('/settings')} variant={'cog'} title={'Settings'} />
      </div>

      <CastButton />
    </header>
  );
}

const PageLink = ({ to, isActive = false, variant, title }: any) => (
  <Link to={to} class={[styles.pageLink, { [styles.active]: isActive }]}>
    <div class={styles.iconContainer}>
      <Icon class={{ [styles.isActive]: isActive }} variant={variant} alt={variant} />
    </div>
    <p>{title}</p>
  </Link>
);

function ProfileButton({ isCollapsed }) {
  const { user } = useAuth();

  if (user === undefined || user.isAnonymous) return <PageLink to={'/login'} variant={'log-in'} title={'Sign in'} />;

  // TODO this should be based on user's settings
  const [userVisible, setUserVisible] = useState<boolean>(true);
  function toggleUserVisible() {
    setUserVisible(!userVisible);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div class={styles.profileMenu}>
      <button class={styles.pageLink} onKeyPress={e => e.key === 'Enter' && toggleIsOpen()} onMouseDown={toggleIsOpen}>
        <div class={styles.iconContainer}>
          <img src={user.photoURL ?? ''} alt={'user'} />
          <div class={[styles.profileVisibility, { [styles.visible]: userVisible }]} />
        </div>

        <p>{user?.displayName}</p>
      </button>

      {isOpen && (
        <ProfileMenu
          hideMenu={() => setIsOpen(false)}
          userVisible={userVisible}
          toggleUserVisible={toggleUserVisible}
          isCollapsed={isCollapsed}
        />
      )}
    </div>
  );
}

function CastButton() {
  const { canCast, isCasting, startCast, stopCast } = useCast();

  if (isCasting)
    return (
      <Button onClick={stopCast}>
        <div class={styles.buttonInner}>
          <div class={styles.iconContainer}>
            <Icon variant={'cast'} alt={'cast'} />
          </div>
          <p>Stop casting</p>
        </div>
      </Button>
    );

  if (canCast)
    return (
      <Button onClick={startCast}>
        <div class={styles.buttonInner}>
          <div class={styles.iconContainer}>
            <Icon variant={'cast'} alt={'cast'} />
          </div>
          <p>Start casting</p>
        </div>
      </Button>
    );
}

export default Header;
