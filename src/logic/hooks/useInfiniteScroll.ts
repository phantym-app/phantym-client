import { useState, useEffect } from 'preact/hooks';

function useInfiniteScroll(handler: () => any) {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('success');

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
        handleScroll();
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
