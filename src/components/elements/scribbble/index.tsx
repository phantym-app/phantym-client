import { h } from 'preact';
import type { Scribbble } from './Scribbble';
import styles from './Scribbble.module.scss';

type Props = {
  variant: Scribbble;
  width?: number;
  height?: number;
  colour?: 'purple' | 'green' | 'orange' | 'red';
};

export default ({ variant, width, height, colour }: Props) => (
  <img
    class={{ [styles[colour]]: colour }}
    src={'/assets/scribbbles/' + variant + '.svg'}
    width={width}
    height={height}
    alt={'scribbble'}
  />
);
