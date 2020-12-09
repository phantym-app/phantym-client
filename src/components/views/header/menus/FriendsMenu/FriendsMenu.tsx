import React, { RefObject, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './FriendsMenu.module.scss';
import { useOnClickOutside } from '../../../../../logic/useOnClickOutside';
import addFriend from '../../../../../assets/icons/user-plus.svg';
import Friend from './Friend/Friend';

type Props = {
  setMenuState: (a: string) => void,
};

const FriendsMenu = (props: Props) => {
  const { setMenuState } = props;
  const [activeMenu, setActiveMenu] = useState('friends');
  const ref = useRef<RefObject<HTMLDivElement>>(null);
  useOnClickOutside(ref, () => setMenuState(''));
  const friends = [
    {
      name: 'John',
      status: 'online'
    },
    {
      name: 'Eva',
      status: 'online'
    },
    {
      name: 'Gumowski',
      status: 'offline'
    },
    {
      name: 'Peter',
      status: 'online'
    },
    {
      name: 'Horacio',
      status: 'offline'
    }
  ];
  let onlineFriends = 3;
  let amountOfFriends = friends.length;

  return (
    //@ts-ignore
    <div ref={ref} className={classnames(styles.root)}>
      <div className={classnames(styles.triangle)} />
      <div className={classnames(styles.header)}>
        <div className={classnames(styles.navigation)}>
          <button onClick={() => setActiveMenu('friends')}>
            <h6
              className={classnames({ [styles.active]: activeMenu === 'friends' })}
            >
              Friends</h6>
          </button>
          <button onClick={() => setActiveMenu('groups')}>
            <h6
              className={classnames({ [styles.active]: activeMenu === 'groups' })}
            >
              Groups</h6>
          </button>
        </div>
        <button><img src={addFriend} alt={'add-friend'} /></button>
      </div>
      <div className={classnames(styles.divider)}>
        <hr />
      </div>
      <div className={classnames(styles.friends)}>
        <div className={classnames(styles.online)}>
          <p>{`Online (${onlineFriends}/${amountOfFriends})`}</p>
        </div>
        {friends.map((friend, index) => {
          return <Friend key={index} name={friend.name} status={friend.status} />
        })}
      </div>
    </div>
  );
};

export default FriendsMenu;
