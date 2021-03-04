import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export default function IntersectionTrigger({ onVisible }: { onVisible: () => any }) {
  const ref = useRef<HTMLElement>();

  useEffect(
    function () {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        async function ([{ isIntersecting }]) {
          if (isIntersecting) onVisible();
        },
        { threshold: 0 },
      );

      observer.observe(ref.current);

      return function cleanup() {
        observer.unobserve(ref.current);
      };
    },
    [ref, ref.current, onVisible],
  );

  return <div ref={ref} style='width: inherit; height: inherit; min-width: 1px; min-height: 1px' />;
}
