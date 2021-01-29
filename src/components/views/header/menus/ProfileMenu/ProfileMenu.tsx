import { h } from 'preact';
import { useRef } from 'preact/hooks';
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
    <div ref={ref} class={[styles.root, { [styles.isCollapsed]: isCollapsed }]}>
      <button class={styles.option}>
        <div class={styles.iconContainer}>
          <img src={user} alt={'profile'} />
        </div>
        <p>Profile</p>
      </button>
      <button onClick={toggleUserVisible} class={[styles.option, styles.visible]}>
        <div class={styles.iconContainer}>
          <img src={userVisible ? visibleEye : notVisible} alt={'visible'} />
        </div>
        <p>Visible</p>
        <Toggle checked={userVisible} />
      </button>
      <button onClick={signOut} class={styles.option}>
        <div class={styles.iconContainer}>
          <img src={logOut} alt={'profile'} />
        </div>
        <p>Log out</p>
      </button>
    </div>
  );
}

export default ProfileMenu;
