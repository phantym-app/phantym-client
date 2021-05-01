import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import styles from './CheckButton.module.scss';

import { JamIcon } from '@components/elements/icon/JamIcon';
import Icon from '@components/elements/icon';

type Props = {
  icon: JamIcon;
  selectedIcon?: JamIcon;
  initialIconColour?: 'white';
  colour?: 'purple' | 'green' | 'red' | 'orange';
  selected?: boolean;
  onClick?: () => void;
  animateIconOnSelect?: { keyframes: Keyframe[] | PropertyIndexedKeyframes; options: any };
  animateIconOnDeselect?: { keyframes: Keyframe[] | PropertyIndexedKeyframes; options: any };
};

function CheckButton({
  icon,
  colour,
  selectedIcon,
  selected,
  onClick,
  animateIconOnSelect,
  animateIconOnDeselect,
  initialIconColour,
}: Props) {
  const [isSelected, setSelected] = useState<boolean>(selected);
  const iconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  const handleOnClickProp = () => {
    if (onclick) {
      onClick();
    } else {
      setSelected(prevState => !prevState);
    }

    if (animateIconOnSelect && !isSelected) {
      iconRef.current.animate(animateIconOnSelect.keyframes, animateIconOnSelect.options);
    } else if (animateIconOnDeselect) {
      iconRef.current.animate(animateIconOnDeselect.keyframes, animateIconOnDeselect.options);
    }
  };

  return (
    <button
      onClick={() => handleOnClickProp()}
      class={[
        styles.root,
        styles[colour],
        { [styles.selected]: isSelected, [styles.whiteIcon]: initialIconColour === 'white' },
      ]}>
      <div class={[styles.colouredBackground, styles[colour]]} />
      <Icon
        reference={iconRef}
        class={styles.icon}
        variant={selectedIcon ? (isSelected ? selectedIcon : icon) : icon}
        alt={styles.icon}
      />
    </button>
  );
}

export default CheckButton;
