import { useState } from 'preact/hooks';

export function useChat() {
  const [chats, setChats] = useState([]);

  function onIncomingChat({ uid, data }) {
    setChats(chats => [...chats, { uid, text: data }]);
  }

  return { chats, onIncomingChat };
}
