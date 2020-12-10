import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './Header.module.scss';
import friends from '../../../assets/icons/users.svg';
import notifications from '../../../assets/icons/bell.svg';
import user from '../../../assets/icons/user.svg';
import FriendsMenu from './menus/FriendsMenu/FriendsMenu';
import ProfileMenu from './menus/ProfileMenu/ProfileMenu';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('');

  return (
    <header className={classnames(styles.root)}>
      <div className={classnames(styles.logo)} />
      <div className={classnames(styles.links)}>
        <a href={''}>
          <p>Browse</p>
        </a>
        <a href={''}>
          <p>My games</p>
        </a>
      </div>
      <div className={classnames(styles.actions)}>
        {/* Friends menu */}

        <div>
          <button
            className={classnames(styles.headerAction)}
            onKeyPress={(e: any) =>
              e.key === 'Enter' &&
              setActiveMenu(activeMenu === 'friends' ? '' : 'friends')
            }
            onMouseDown={() =>
              setActiveMenu(activeMenu === 'friends' ? '' : 'friends')
            }>
            <img src={friends} alt={'friends'} />
          </button>
          {activeMenu === 'friends' && (
            <FriendsMenu setMenuState={setActiveMenu} />
          )}
        </div>

        {/* Notifications menu */}

        <div>
          <button
            className={classnames(styles.headerAction)}
            onKeyPress={(e: any) =>
              e.key === 'Enter' &&
              setActiveMenu(
                activeMenu === 'notifications' ? '' : 'notifications'
              )
            }
            onMouseDown={() =>
              setActiveMenu(
                activeMenu === 'notifications' ? '' : 'notifications'
              )
            }>
            <img src={notifications} alt={'notifications'} />
          </button>
        </div>

        {/* Profile button */}

        <div>
          <button
            className={classnames(styles.headerAction)}
            onKeyPress={(e: any) =>
              e.key === 'Enter' &&
              setActiveMenu(activeMenu === 'profile' ? '' : 'profile')
            }
            onMouseDown={() =>
              setActiveMenu(activeMenu === 'profile' ? '' : 'profile')
            }>
            <img src={user} alt={'user'} />
          </button>
          {activeMenu === 'profile' && (
            <ProfileMenu setMenuState={setActiveMenu} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
