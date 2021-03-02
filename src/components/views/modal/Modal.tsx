import { h, Fragment } from 'preact';
import styles from './Modal.module.scss';

import Icon, { JamIcon } from '@components/elements/icon';
import Button from '@components/elements/button/Button';

interface ActionButton {
  buttonType?: 'secondary' | 'error' | 'warning' | 'google' | 'facebook' | 'success' | 'ghost';
  butonText: string;
  buttonIcon: JamIcon;
  onClick: () => void;
}

interface Props {
  title: string;
  active: boolean;
  dismissModal: () => void;
  location: 'right' | 'left' | 'top' | 'bottom' | 'center';
  origin: 'right' | 'left' | 'top' | 'bottom';
  children?: any;
  actions?: {
    primary: ActionButton;
    secondary?: ActionButton;
  };
  hasDimmer?: boolean;
}

const Modal = ({ hasDimmer, title, origin, active, dismissModal, location, actions, children }: Props) => {
  return (
    <>
      {active && (
        <>
          <div
            class={[
              styles.root,
              {
                [styles[location]]: location,
                [styles.rightOrigin]: origin === 'right',
                [styles.leftOrigin]: origin === 'left',
                [styles.topOrigin]: origin === 'top',
                [styles.bottomOrigin]: origin === 'bottom',
              },
            ]}>
            <div class={styles.header}>
              <div>
                {origin === 'left' && <Icon variant={'arrow-left'} alt={'dismiss'} onClick={dismissModal} />}
                <h6>{title}</h6>
              </div>
              {origin !== 'left' && (
                <Icon variant={origin === 'right' ? 'arrow-right' : 'close'} alt={'dismiss'} onClick={dismissModal} />
              )}
            </div>
            {children}
            {actions && (
              <div class={styles.actions}>
                {actions.secondary && (
                  <Button onClick={actions.secondary.onClick} colour={actions.secondary.buttonType}>
                    <Icon variant={actions.secondary.buttonIcon} alt={actions.secondary.buttonIcon} />
                    {actions.secondary.butonText}
                  </Button>
                )}
                <Button onClick={actions.primary.onClick} colour={actions.primary.buttonType}>
                  <Icon variant={actions.primary.buttonIcon} alt={actions.primary.buttonIcon} />
                  {actions.primary.butonText}
                </Button>
              </div>
            )}
          </div>
          {hasDimmer && <div id={'dimmer'} class={styles.dimmer} onClick={dismissModal} />}
        </>
      )}
    </>
  );
};

export default Modal;
