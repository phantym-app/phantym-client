import { h } from 'preact';
import { useRef } from 'preact/hooks';
import styles from './Select.module.scss';
import { useSelect } from './selectState';
import { useOnClickOutside } from '@logic/hooks/useOnClickOutside';
import Icon from '@components/elements/icon';

type Props = {
  label: string;
  options: Array<string>;
};

const Select = ({ label, options }: Props) => {
  const { value, setValue, isOpen, setOpen } = useSelect();
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));

  return (
    <div class={styles.shadowSelect}>
      <div
        ref={selectRef}
        class={[styles.root, { [styles.active]: isOpen, [styles.pickedValue]: value !== '' && value !== options[0] }]}>
        <div class={styles.labelContainer}>
          <p>{label}</p>
        </div>
        <input
          onClick={() => setOpen(!isOpen)}
          onKeyPress={(e: any) => e.key === 'Enter' && setOpen(!isOpen)}
          class={[styles.select, { [styles.initialValue]: value === options[0] }]}
          placeholder={options[0]}
          value={value}
          readOnly
        />
        <div onClick={() => setOpen(!isOpen)} class={styles.chevronContainer}>
          <Icon variant={'chevron-down'} alt={'chevron'} />
        </div>
        <hr onClick={() => setOpen(!isOpen)} />
        <div class={styles.optionsMenu}>
          {options.map((option, index) => (
            <button
              onClick={() => {
                setValue(option);
                setOpen(!isOpen);
              }}
              class={[styles.option, { [styles.pickedValue]: option === value }]}
              key={index}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
