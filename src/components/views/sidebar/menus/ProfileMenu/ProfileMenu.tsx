import { h } from 'preact';
import { useRef } from 'preact/hooks';
import styles from './ProfileMenu.module.scss';

import Icon from '@components/elements/icon';
import { useOnClickOutside } from '@logic/hooks/useOnClickOutside';
import Toggle from '@components/elements/toggle/Toggle';
import { useAuth } from '@store/auth';

type Props = {
  hideMenu: () => void;
  userVisible: boolean;
  toggleUserVisible: (any: any) => void;
  isCollapsed: boolean;
};

function ProfileMenu({ hideMenu, userVisible, toggleUserVisible, isCollapsed }: Props) {
  const { signOut } = useAuth();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, hideMenu);

  return (
    <div ref={ref} class={[styles.root, { [styles.isCollapsed]: isCollapsed }]}>
      <button class={styles.option}>
        <Icon variant={'user'} alt={'profile'} />
        <p>Profile</p>
      </button>
      <button onClick={toggleUserVisible} class={[styles.option, styles.visible]}>
        <Icon variant={userVisible ? 'eye' : 'eye-close'} alt={'visible'} />
        <p>Visible</p>
        <Toggle checked={userVisible} />
      </button>
      <button onClick={signOut} class={styles.option}>
        <Icon variant={'log-out'} alt={'profile'} />
        <p>Log out</p>
      </button>
    </div>
  );
}

export default ProfileMenu;
