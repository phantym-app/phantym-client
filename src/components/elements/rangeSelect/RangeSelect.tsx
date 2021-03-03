import { h } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import styles from './RangeSelect.module.scss';

interface Props {
  title: string;
  values: {
    min: number;
    max: number;
  };
  setValues: (values: { min: number; max: number }) => void;
  max: number;
  min: number;
  decimals?: number;
}

function RangeSelect({ title, values, setValues, min, max, decimals }: Props) {
  const [amountOfDrag, setAmountOfDrag] = useState<{ left: number; right: number }>({ left: 0, right: 0 });

  const dragLeftHandle = useCallback((e: MouseEvent) => {
    const leftHandle = document.getElementById('leftHandle');
    const x = e.clientX;
    const startOfRangeSelect = x - leftHandle.parentElement.parentElement.getBoundingClientRect().left;
    const middleOfHandle = startOfRangeSelect - 10;
    if (middleOfHandle >= 0 && middleOfHandle <= leftHandle.parentElement.parentElement.clientWidth - 40) {
      setAmountOfDrag(prevState =>
        middleOfHandle + prevState.right + 20 < leftHandle.parentElement.clientWidth
          ? {
              left: middleOfHandle,
              right: prevState.right,
            }
          : prevState,
      );
    }
  }, []);

  const dragRightHandle = useCallback((e: MouseEvent) => {
    const rightHandle = document.getElementById('rightHandle');
    const x = e.clientX;
    const startOfRangeSelect = x - rightHandle.parentElement.parentElement.getBoundingClientRect().left;
    const middleOfHandle = startOfRangeSelect - rightHandle.parentElement.parentElement.clientWidth;
    if (-middleOfHandle - 10 >= 0 && -middleOfHandle - 10 <= rightHandle.parentElement.parentElement.clientWidth - 40) {
      setAmountOfDrag(prevState =>
        -middleOfHandle - 10 + prevState.left + 20 < rightHandle.parentElement.clientWidth
          ? { left: prevState.left, right: -middleOfHandle - 10 }
          : prevState,
      );
    }
  }, []);

  useEffect(() => {
    // init the handle positions
    const rangeSteps = max - min + 1;
    const pixelSteps = document.getElementById('range').parentElement.clientWidth / rangeSteps;
    setAmountOfDrag({
      left: (values.min - min) * pixelSteps,
      right: -((values.max - max) * pixelSteps),
    });

    // no dragging after mouse up
    window.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', dragLeftHandle);
      document.removeEventListener('mousemove', dragRightHandle);
    });
  }, []);

  useEffect(() => {
    // push handles
    const rangeContainer = document.getElementById('range');
    rangeContainer.style.paddingLeft = amountOfDrag.left + 'px';
    rangeContainer.style.paddingRight = amountOfDrag.right + 'px';

    // push values
    const minVal = document.getElementById('minVal');
    const maxVal = document.getElementById('maxVal');
    if (amountOfDrag.left - minVal.clientWidth / 4 > 0) {
      minVal.style.marginLeft = amountOfDrag.left - minVal.clientWidth / 4 + 'px';
    }
    if (amountOfDrag.right - maxVal.clientWidth / 4 > 0) {
      maxVal.style.marginRight = amountOfDrag.right - maxVal.clientWidth / 4 + 'px';
    }

    // set values based on drag pixels
    const rangeSteps = max - min + 1;
    const pixelSteps = rangeContainer.parentElement.clientWidth / rangeSteps;
    setValues({
      min: min + amountOfDrag.left / pixelSteps,
      max: max - amountOfDrag.right / pixelSteps,
    });
  }, [amountOfDrag]);

  return (
    <div class={styles.root}>
      <div class={styles.info}>
        <p class={styles.title}>{title}</p>
        <div>
          <p id={'minVal'}>{values.min.toFixed(decimals ? decimals : null)}</p>
          <p id={'maxVal'}>{values.max.toFixed(decimals ? decimals : null)}</p>
        </div>
      </div>
      <div class={styles.rangeContainer}>
        <div class={styles.track} />
        <div id={'range'} class={styles.range}>
          <div
            id={'leftHandle'}
            class={styles.leftHandle}
            onmousedown={() => document.addEventListener('mousemove', dragLeftHandle)}
          />
          <div class={styles.rangeProgress} />
          <div
            id={'rightHandle'}
            class={styles.rightHandle}
            onmousedown={() => document.addEventListener('mousemove', dragRightHandle)}
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSelect;
