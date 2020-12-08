import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './Header.module.scss';
import friends from '../../../assets/icons/users.svg';
import notifications from '../../../assets/icons/bell.svg';
import user from '../../../assets/icons/user.svg';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('');

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
          <ProfileMenu isActive={activeMenu === 'profile'} setMenuState={setActiveMenu} />
        </div>
      </div>
    </header >
  );
};

export default Header;