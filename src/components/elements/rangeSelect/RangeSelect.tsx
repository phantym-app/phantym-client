import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './RangeSelect.module.scss';

interface Props {
  title: string;
  minMax: {
    min: number;
    max: number;
  };
}

function RangeSelect({ title, minMax }: Props) {
  const [amountOfDrag, setAmountOfDrag] = useState<{ left: number; right: number }>({ left: 0, right: 0 });
  const [values, setValues] = useState<{ min: number; max: number }>({ min: minMax.min, max: minMax.max });

  const dragLeftHandle = (e: MouseEvent) => {
    const leftHandle = document.getElementById('leftHandle');
    const x = e.clientX;
    const startOfRangeSelect = x - leftHandle.parentElement.parentElement.getBoundingClientRect().left;
    const middleOfHandle = startOfRangeSelect - 10;
    if (middleOfHandle >= 0 && middleOfHandle <= leftHandle.parentElement.parentElement.clientWidth - 40) {
      setAmountOfDrag(prevState => ({ left: middleOfHandle, right: prevState.right }));
    }
  };

  const dragRightHandle = (e: MouseEvent) => {
    const rightHandle = document.getElementById('rightHandle');
    const x = e.clientX;
    const startOfRangeSelect = x - rightHandle.parentElement.parentElement.getBoundingClientRect().left;
    const middleOfHandle = startOfRangeSelect - rightHandle.parentElement.parentElement.clientWidth;
    if (-middleOfHandle - 10 >= 0 && -middleOfHandle - 10 <= rightHandle.parentElement.parentElement.clientWidth - 40) {
      setAmountOfDrag(prevState => ({ left: prevState.left, right: -middleOfHandle - 10 }));
    }
  };

  const handleLeftDrag = () => document.addEventListener('mousemove', dragLeftHandle);
  const handleRightDrag = () => document.addEventListener('mousemove', dragRightHandle);

  useEffect(() => {
    const rangeContainer = document.getElementById('range');
    window.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', dragLeftHandle);
      document.removeEventListener('mousemove', dragRightHandle);
    });

    rangeContainer.style.paddingLeft = amountOfDrag.left + 'px';
    rangeContainer.style.paddingRight = amountOfDrag.right + 'px';

    const minVal = document.getElementById('minVal');
    const maxVal = document.getElementById('maxVal');
    if (amountOfDrag.left - minVal.clientWidth / 4 > 0) {
      minVal.style.marginLeft = amountOfDrag.left - minVal.clientWidth / 4 + 'px';
    }
    if (amountOfDrag.right - maxVal.clientWidth / 4 > 0) {
      maxVal.style.marginRight = amountOfDrag.right - maxVal.clientWidth / 4 + 'px';
    }

    const rangeSteps = minMax.max - minMax.min;
    const pixelSteps = rangeContainer.parentElement.clientWidth / rangeSteps;
    setValues({
      min: Number((minMax.min + amountOfDrag.left / pixelSteps).toFixed()),
      max: Number((minMax.max - amountOfDrag.right / pixelSteps).toFixed()),
    });
  }, [amountOfDrag, values, setValues]);

  return (
    <div class={styles.root}>
      <div class={styles.info}>
        <p class={styles.title}>{title}</p>
        <div>
          <p id={'minVal'}>{values.min}</p>
          <p id={'maxVal'}>{values.max}</p>
        </div>
      </div>
      <div class={styles.rangeContainer}>
        <div class={styles.track} />
        <div id={'range'} class={styles.range}>
          <div id={'leftHandle'} class={styles.leftHandle} onmousedown={handleLeftDrag} />
          <div class={styles.rangeProgress} />
          <div id={'rightHandle'} class={styles.rightHandle} onmousedown={handleRightDrag} />
        </div>
      </div>
    </div>
  );
}

export default RangeSelect;
