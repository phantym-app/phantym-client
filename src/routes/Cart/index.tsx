import { h } from 'preact';
import styles from './Cart.module.scss';
import classnames from 'classnames';

const Cart = () => {
  return <div className={classnames(styles.root)}>Hi this is your cart</div>;
};

export default Cart;
