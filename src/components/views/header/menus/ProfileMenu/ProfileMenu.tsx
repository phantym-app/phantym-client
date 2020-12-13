import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import classnames from 'classnames';
import styles from './ProfileMenu.module.scss';
import user from '@assets/icons/user.svg';
import visible from '@assets/icons/eye.svg';
import notVisible from '@assets/icons/eye-close.svg';
import settings from '@assets/icons/cog.svg';
import logOut from '@assets/icons/log-out.svg';

import { useOnClickOutside } from '../../../../../logic/useOnClickOutside';
import Toggle from '../../../../elements/toggle/Toggle';
import { AuthContainer } from '../../../../../store/auth';

type Props = {
  setMenuState: (a: string) => void;
};

const ProfileMenu = (props: Props) => {
  const { setMenuState } = props;
  const [visibility, setVisibility] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setMenuState(''));
  const { signOut } = AuthContainer.useContainer();

  return (
    <div
      //@ts-ignore
      ref={ref}
      className={classnames(styles.root)}
    >
      <button className={classnames(styles.option)}>
        <img src={user} alt={'profile'} />
        <p>Profile</p>
      </button>
      <button
        onClick={() => {
          setVisibility(!visibility);
          console.log(visibility);
        }}
        className={classnames(styles.option, styles.visible)}
      >
        <img src={visibility ? visible : notVisible} alt={'visible'} />
        <p>Visible</p>
        <Toggle checked={visibility} />
      </button>
      <button className={classnames(styles.option)}>
        <img src={settings} alt={'settings'} />
        <p>Settings</p>
      </button>
      <button onClick={signOut} className={classnames(styles.option)}>
        <img src={logOut} alt={'profile'} />
        <p>Log out</p>
      </button>
    </div>
  );
};

export default ProfileMenu;
