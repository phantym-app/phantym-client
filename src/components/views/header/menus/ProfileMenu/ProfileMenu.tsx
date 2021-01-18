import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import styles from './ProfileMenu.module.scss';
import user from '@assets/icons/user.svg';
import visible from '@assets/icons/eye.svg';
import notVisible from '@assets/icons/eye-close.svg';
import logOut from '@assets/icons/log-out.svg';

import { useOnClickOutside } from '@logic/useOnClickOutside';
import Toggle from '@components/elements/toggle/Toggle';
import { AuthContainer } from '@store/auth';

type Props = {
  hideMenu: () => void;
};

function ProfileMenu({ hideMenu }: Props) {
  const [visibility, setVisibility] = useState(false);
  const { signOut } = AuthContainer.useContainer();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, hideMenu);

  return (
    <div ref={ref} class={styles.root}>
      <button class={styles.option}>
        <img src={user} alt={'profile'} />
        <p>Profile</p>
      </button>
      <button
        onClick={function () {
          setVisibility(!visibility);
        }}
        class={[styles.option, styles.visible]}>
        <img src={visibility ? visible : notVisible} alt={'visible'} />
        <p>Visible</p>
        <Toggle checked={visibility} />
      </button>
      <button onClick={signOut} class={styles.option}>
        <img src={logOut} alt={'profile'} />
        <p>Log out</p>
      </button>
    </div>
  );
}

export default ProfileMenu;
