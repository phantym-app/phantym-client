import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useLocal } from '@store/local';
import styles from './Sidebar.module.scss';

import Icon from '@components/elements/icon';
import Button from '@components/elements/button/Button';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';
import Hamburger from '@components/elements/hamburger/Hamburger';

import { Link } from 'preact-router/match';

import { useAuth } from '@store/auth';
import { useCast } from '@store/cast';
import { useDeviceWidth } from '@store/deviceWidth';

function Sidebar({ path }) {
  const { maxTablet } = useDeviceWidth();
  const [isCollapsed, setCollapsed] = useLocal<boolean>('sidebarHidden');

  return (
    <>
      <header class={[styles.root, { [styles.hidden]: path === '/login', [styles.collapsed]: isCollapsed }]}>
        <div class={styles.links}>
          <div class={styles.title}>
            <Hamburger isActive={!isCollapsed} onClick={() => setCollapsed(!isCollapsed)} />
          </div>

          <ProfileButton isCollapsed={isCollapsed} />
          <PageLink href={'/browse'} icon={'compass'} title={'Browse'} />
          <PageLink href={'/'} icon={'gamepad'} title={'My games'} />
          <PageLink href={'/cart'} icon={'shopping-cart'} title={'Cart'} />
          <PageLink href={'/social/friends'} icon={'users'} title={'Social'} />
          <PageLink href={'/room'} icon={'door'} title={'Room'} />
          <PageLink href={'/settings'} icon={'cog'} title={'Settings'} />
        </div>

        <CastButton />
      </header>
      {maxTablet && (
        <div
          id={'dimmer'}
          class={[styles.dimmer, { [styles.active]: !isCollapsed, [styles.hidden]: path === '/login' }]}
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}

const PageLink = ({ href, icon, title }: any) => (
  <Link href={href} class={styles.pageLink} activeClassName='active'>
    <div class={styles.iconContainer}>
      <Icon variant={icon} alt={icon} />
    </div>
    <p>{title}</p>
  </Link>
);

function ProfileButton({ isCollapsed }) {
  const { user } = useAuth();

  if (user === undefined || user.isAnonymous) return <PageLink href={'/login'} icon={'log-in'} title={'Sign in'} />;

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

export default Sidebar;
