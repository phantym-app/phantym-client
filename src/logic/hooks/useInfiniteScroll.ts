import { useState, useEffect } from 'react';

type Status = 'pending' | 'success' | 'error';

function useInfiniteScroll(handler: () => any) {
  const [status, setStatus] = useState<Status>('success');

  useEffect(
    function () {
      addEventListener('scroll', handleScroll);

      return function cleanup() {
        removeEventListener('scroll', handleScroll);
      };
    },
    [handler, status],
  );

  async function handleScroll() {
    const scolledToBottom =
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

    if (status === 'success' && scolledToBottom) {
      setStatus('pending');

      try {
        await handler();
        setStatus('success');
      } catch {
        setStatus('error');
      }
    }
  }

  useEffect(function () {
    handleScroll();
  }, []);

  return status;
}

export default useInfiniteScroll;
