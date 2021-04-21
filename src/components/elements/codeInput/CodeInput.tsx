import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './CodeInput.module.scss';

type Props = {
  lifted?: boolean;
  onFilled: (value: string) => Promise<void>;
};

const placeholders = ['u', 'c', 'o', 'd', 'e'];

function CodeInput({ lifted, onFilled }: Props) {
  const [code, setCode] = useState<Array<string>>(['', '', '', '', '']);

  const onInputChange = (event: any) => {
    const inputNumber: number = Number(event.target.name);
    const nextInput = document.getElementsByName((inputNumber + 1).toString())[0] as HTMLInputElement;
    const previousInput = document.getElementsByName((inputNumber - 1).toString())[0] as HTMLInputElement;

    // User typed a letter in the alphabet
    if (/^[a-zA-Z]{1}$/.test(event.key)) {
      let newCodeArray = code;
      newCodeArray[inputNumber] = event.key;
      setCode(newCodeArray);
      event.target.value = event.key;
      if (nextInput !== undefined) {
        setTimeout(() => {
          nextInput.focus();
        });
      } else {
        onFilled(code.join(''));
      }
      // User pressed backspace
    } else if (event.key === 'Backspace') {
      if (event.target.value.length > 0) {
        event.target.value = '';
      } else {
        if (previousInput !== undefined) {
          setTimeout(() => {
            previousInput.focus();
            previousInput.value = '';
          });
        }
      }
      // User typed something that isn't a letter or backspace
    } else {
      event.preventDefault();
    }
  };

  return (
    <div class={[styles.root, { [styles.lifted]: lifted }]}>
      {code.map((_, index: number) => {
        return (
          <input
            name={index}
            type='text'
            maxlength='1'
            onKeyDown={(e: InputEvent) => onInputChange(e)}
            placeholder={placeholders[index]}
          />
        );
      })}
    </div>
  );
}

export default CodeInput;
