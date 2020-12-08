import React from 'react';
import classnames from 'classnames';
import styles from './Header.module.scss';
import friends from '../../../assets/icons/users.svg';
import notifications from '../../../assets/icons/bell.svg';
import user from '../../../assets/icons/user.svg';
import visible from '../../../assets/icons/eye.svg';
import settings from '../../../assets/icons/cog.svg';
import logOut from '../../../assets/icons/log-out.svg';
import { useHeader } from './HeaderState';

const Header = () => {
  const { activeMenu, setActiveMenu } = useHeader();
  return (
    <header className={classnames(styles.root)}>
      <div className={classnames(styles.logo)} />
      <div className={classnames(styles.links)}>
        <a href={""}><p>Browse</p></a>
        <a href={""}><p>My games</p></a>
      </div>
      <div className={classnames(styles.actions)}>
        <button><img src={friends} alt={'friends'} /></button>
        <button><img src={notifications} alt={'notifications'} /></button>

        {/* Profile button */}

        <div>
          <button onClick={
            () => setActiveMenu(
              activeMenu === 'profile' ? '' : 'profile'
            )}>
            <img src={user} alt={'user'} /></button>
          <div className={classnames(
            styles.profileMenu,
            { [styles.active]: activeMenu === 'profile' }
          )}>
            <div className={classnames(styles.triangle)}/>
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
        </div>
      </div>
    </header >
  );
};

export default Header;