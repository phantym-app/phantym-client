import { h } from 'preact';
import { useRef } from 'preact/hooks';
import type { JamIcon } from './JamIcon';

type Props = {
  class?: any;
  variant: 'cast' | JamIcon;
  width?: number;
  height?: number;
  alt: string;
  onClick?: () => any;
  reference?: any;
};

export default (p: Props) => (
  <img
    ref={p.reference}
    src={'/assets/icons/' + p.variant + '.svg'}
    class={p.class}
    width={p.width}
    height={p.height}
    alt={p.alt}
    onClick={p.onClick}
  />
);
