import React, { useRef, RefObject } from 'react';
import classnames from 'classnames';
import styles from './ProfileMenu.module.scss';
import user from '../../../../../assets/icons/user.svg';
import visible from '../../../../../assets/icons/eye.svg';
import settings from '../../../../../assets/icons/cog.svg';
import logOut from '../../../../../assets/icons/log-out.svg';
import { useOnClickOutside } from '../../../../../logic/useOnClickOutside';

type Props = {
  isActive: boolean,
  setMenuState: (a: string) => void,
};

const ProfileMenu = (props: Props) => {
  const { isActive, setMenuState } = props;
  const ref = useRef<RefObject<HTMLDivElement>>(null);
  useOnClickOutside(ref, () => setMenuState(''));

  return (
    <div
      //@ts-ignore
      ref={ref}
      className={classnames(
        styles.root,
        { [styles.active]: isActive }
      )}>
      <div className={classnames(styles.triangle)} />
      <button className={classnames(styles.option)}>
        <img src={user} alt={'profile'} />
        <p>Profile</p>
      </button>
      <button className={classnames(styles.option)}>
        <img src={visible} alt={'visible'} />
        <p>Visible</p>
      </button>
      <button className={classnames(styles.option)}>
        <img src={settings} alt={'settings'} />
        <p>Settings</p>
      </button>
      <button className={classnames(styles.option)}>
        <img src={logOut} alt={'profile'} />
        <p>Log out</p>
      </button>
    </div>
  );
};

export default ProfileMenu;