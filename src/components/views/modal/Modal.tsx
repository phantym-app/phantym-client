import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Modal.module.scss';

import Icon from '@components/elements/icon';
import Button from '@components/elements/button/Button';
interface Props {
  active: boolean;
  dismissModal: () => void;
  origin: 'right' | 'left' | 'top' | 'bottom';
  children?: any;
  hasDimmer?: boolean;
}

const Modal = ({ hasDimmer, origin, active, dismissModal, children }: Props) => {
  const [willDismiss, setWillDismiss] = useState<boolean>(false);

  const handleClose = () => {
    setWillDismiss(true);
    setTimeout(() => {
      dismissModal();
      setWillDismiss(false);
    }, 250);
  };

  const header = children.find(child => child.type.name === 'modalHeader');
  header.props.handleClose = handleClose;
  header.props.origin = origin;

  return (
    <>
      {active && (
        <>
          <div
            class={[
              styles.root,
              {
                [styles[origin]]: origin,
                [styles.exit]: willDismiss,
              },
            ]}>
            {children}
          </div>
          {hasDimmer && (
            <div id={'dimmer'} class={[styles.dimmer, { [styles.fadeOut]: willDismiss }]} onClick={handleClose} />
          )}
        </>
      )}
    </>
  );
};

interface HeaderProps {
  title: string;
  handleClose?: () => void;
  origin?: string;
}

Modal.Header = function modalHeader({ title, handleClose, origin }: HeaderProps) {
  return (
    <div class={styles.header}>
      <div>
        {origin === 'left' && (
          <Button lifted={1} rounded colour={'secondary'} onClick={handleClose}>
            <Icon variant={'arrow-left'} alt={'dismiss'} />
          </Button>
        )}
        <h4>{title}</h4>
      </div>
      {origin !== 'left' && (
        <Button lifted={1} rounded colour={'secondary'} onClick={handleClose}>
          <Icon variant={origin === 'right' ? 'arrow-right' : 'close'} alt={'dismiss'} />
        </Button>
      )}
    </div>
  );
};

Modal.Body = function ({ children, classNames }) {
  return <div class={[styles.body, ...classNames]}>{children}</div>;
};

Modal.Actions = function ({ children }) {
  return <div class={styles.actions}>{children}</div>;
};

export default Modal;
