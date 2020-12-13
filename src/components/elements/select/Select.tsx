import { h } from 'preact';
import { useRef } from 'preact/hooks';
import styles from './Select.module.scss';
import classnames from 'classnames';
import { useSelect } from './selectState';
import chevron from '@assets/icons/chevron-down.svg';
import { useOnClickOutside } from '../../../logic/useOnClickOutside';

type Props = {
  options: Array<string>;
};

const Select = (props: Props) => {
  const { value, setValue, isOpen, setOpen } = useSelect();
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));
  const { options } = props;
  return (
    <div
      ref={selectRef}
      className={classnames(styles.root, { [styles.active]: isOpen })}
    >
      <input
        onClick={() => setOpen(!isOpen)}
        onKeyPress={(e: any) => e.key === 'Enter' && setOpen(!isOpen)}
        className={classnames(styles.select, {
          [styles.initialValue]: value === options[0],
        })}
        placeholder={options[0]}
        value={value}
        readOnly
      />
      <div
        onClick={() => setOpen(!isOpen)}
        className={classnames(styles.chevronContainer)}
      >
        <img src={chevron} alt={'chevron'} />
      </div>
      <hr onClick={() => setOpen(!isOpen)} />
      <div className={classnames(styles.optionsMenu)}>
        {options.map((option, index) => (
          <button
            onClick={() => {
              setValue(option);
              setOpen(!isOpen);
            }}
            className={classnames(styles.option)}
            key={index}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
