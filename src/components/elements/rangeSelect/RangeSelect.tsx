import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import styles from './RangeSelect.module.scss';

interface Props {
  title: string;
  range: {
    val1: string;
    val2: string;
  };
}

function RangeSelect({ title, range }: Props) {
  const dragLeft = (e: MouseEvent) => {
    const leftHandle = document.getElementById('leftHandle');
    const x = e.clientX;
    const rangePadding = x - leftHandle.parentElement.offsetWidth - 40;
    if (rangePadding < leftHandle.parentElement.offsetWidth - 20) {
      leftHandle.parentElement.style.paddingLeft = rangePadding + 'px';
    }
  };

  const dragRight = (e: MouseEvent) => {
    const rightHandle = document.getElementById('rightHandle');
    const x = e.clientX;
    const rangePadding = x - rightHandle.parentElement.offsetWidth * 2 - 40;
    if (-rangePadding < rightHandle.parentElement.offsetWidth) {
      rightHandle.parentElement.style.paddingRight = -rangePadding + 'px';
    }
  };

  const handleLeftDrag = () => document.addEventListener('mousemove', dragLeft);
  const handleRightDrag = () => document.addEventListener('mousemove', dragRight);

  useEffect(() => {
    window.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', dragLeft);
      document.removeEventListener('mousemove', dragRight);
    });
  }, []);

  return (
    <div class={styles.root}>
      <div class={styles.info}>
        <p class={styles.title}>{title}</p>
        <div>
          <p>{range.val1}</p>
          <p>{range.val2}</p>
        </div>
      </div>
      <div class={styles.rangeContainer}>
        <div class={styles.track} />
        <div class={styles.range}>
          <div id={'leftHandle'} class={styles.leftHandle} onmousedown={handleLeftDrag} />
          <div class={styles.rangeProgress} />
          <div id={'rightHandle'} class={styles.rightHandle} onmousedown={handleRightDrag} />
        </div>
      </div>
    </div>
  );
}

export default RangeSelect;
