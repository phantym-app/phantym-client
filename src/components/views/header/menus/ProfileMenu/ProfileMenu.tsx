import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import styles from './ProfileMenu.module.scss';
import user from '@assets/icons/user.svg';
import visibleEye from '@assets/icons/eye.svg';
import notVisible from '@assets/icons/eye-close.svg';
import logOut from '@assets/icons/log-out.svg';

import { useOnClickOutside } from '@logic/useOnClickOutside';
import Toggle from '@components/elements/toggle/Toggle';
import { useAuth } from '@store/auth';

type Props = {
  hideMenu: () => void;
  userVisible: boolean;
  toggleUserVisible: (any: any) => void;
};

function ProfileMenu({ hideMenu, userVisible, toggleUserVisible }: Props) {
  const { signOut } = useAuth();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, hideMenu);

  return (
    <div ref={ref} class={styles.root}>
      <button class={styles.option}>
        <img src={user} alt={'profile'} />
        <p>Profile</p>
      </button>
      <button onClick={toggleUserVisible} class={[styles.option, styles.visible]}>
        <img src={userVisible ? visibleEye : notVisible} alt={'visible'} />
        <p>Visible</p>
        <Toggle checked={userVisible} />
      </button>
      <button onClick={signOut} class={styles.option}>
        <img src={logOut} alt={'profile'} />
        <p>Log out</p>
      </button>
    </div>
  );
}

export default ProfileMenu;
