import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import styles from './FriendsMenu.module.scss';
import { useOnClickOutside } from '@logic/useOnClickOutside';
import addFriend from '@assets/icons/user-plus.svg';
import Friend from './Friend/Friend';

type Props = {
  hideMenu: () => void;
};

type Friend = {
  name: string;
  status: 'online' | 'offline';
};

function FriendsMenu({ hideMenu }: Props) {
  const [activeSubmenu, setActiveSubmenu] = useState('friends');

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, hideMenu);

  const friends: Friend[] = [
    {
      name: 'John',
      status: 'online',
    },
    {
      name: 'Eva',
      status: 'online',
    },
    {
      name: 'Gumowski',
      status: 'offline',
    },
    {
      name: 'Peter',
      status: 'online',
    },
    {
      name: 'Horacio',
      status: 'offline',
    },
  ];

  const sortFriends = (friends: Friend[]) =>
    friends
      .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
      .sort((a, b) => (a.status === 'online' && b.status === 'offline' ? -1 : 0));

  let onlineFriends = 3;
  let amountOfFriends = friends.length;

  return (
    //@ts-ignore
    <div ref={ref} class={styles.root}>
      <div class={styles.header}>
        <div class={styles.navigation}>
          <button
            onClick={function () {
              setActiveSubmenu('friends');
            }}>
            <h6 class={{ [styles.active]: activeSubmenu === 'friends' }}>Friends</h6>
          </button>
          <button
            onClick={function () {
              setActiveSubmenu('groups');
            }}>
            <h6 class={{ [styles.active]: activeSubmenu === 'groups' }}>Groups</h6>
          </button>
        </div>
        <button>
          <img src={addFriend} alt={'add-friend'} />
        </button>
      </div>
      <div class={styles.divider}>
        <hr />
      </div>
      <div class={styles.friends}>
        <div class={styles.online}>
          <p>{`Online (${onlineFriends}/${amountOfFriends})`}</p>
        </div>
        {sortFriends(friends).map((friend, i) => (
          <Friend key={i} name={friend.name} status={friend.status} />
        ))}
      </div>
    </div>
  );
}

export default FriendsMenu;
