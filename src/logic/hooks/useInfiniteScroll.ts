import { useState, useEffect } from 'react';

function useInfiniteScroll(handler: () => any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(
    function () {
      addEventListener('scroll', handleScroll);

      return function cleanup() {
        removeEventListener('scroll', handleScroll);
      };
    },
    [handler, isLoading],
  );

  async function handleScroll() {
    const scolledToBottom =
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

    if (!isLoading && scolledToBottom) {
      setIsLoading(true);
      await handler();
      setIsLoading(false);
    }
  }

  useEffect(function () {
    handleScroll();
  }, []);

  return isLoading;
}

export default useInfiniteScroll;
