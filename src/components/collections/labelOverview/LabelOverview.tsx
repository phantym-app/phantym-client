import type { GameLabel } from '@store/gameLibrary';

import { h } from 'preact';
import styles from './LabelOverview.module.scss';
import Label from '@components/elements/label/Label';
import IntersectionTrigger from '@components/elements/intersectionTrigger/IntersectionTrigger';
import { useState, useRef } from 'preact/hooks';

type Props = {
  labels: GameLabel[];
  activeLabels?: string[];
  onLabelClick?: (title: string) => void;
  onScrollEnd?: () => any;
};

const skeletonLabels = [
  { text: '______' },
  { text: '_________' },
  { text: '____' },
  { text: '__________' },
  { text: '___________' },
  { text: '________' },
  { text: '_____' },
  { text: '____________' },
  { text: '______' },
];

function LabelOverview({ onScrollEnd, labels, onLabelClick = function () {}, activeLabels }: Props) {
  const [fetchStatus, setFetchStatus] = useState<'fetching' | 'ready' | 'end'>('ready');
  const [fade, setFade] = useState<{ left: boolean; right: boolean }>({ left: false, right: true });
  const labelContainerRef = useRef<HTMLDivElement>(null);

  async function handleScrollEnd() {
    if (fetchStatus !== 'ready') return;

    setFetchStatus('fetching');
    try {
      await onScrollEnd();
      setFetchStatus('ready');
    } catch {
      setFetchStatus('end');
    }
  }

  let oldMousePosition = 0;

  const handleDrag = (e: MouseEvent) => {
    const labelContainer = labelContainerRef.current;

    if (oldMousePosition < e.clientX) {
      if (Math.abs(oldMousePosition - e.clientX) < 500) {
        labelContainer.scrollLeft -= Math.abs(oldMousePosition - e.clientX);
      }
    } else {
      if (oldMousePosition - e.clientX < 500) {
        labelContainer.scrollLeft += Math.abs(oldMousePosition - e.clientX);
      }
    }
    oldMousePosition = e.clientX;
  };

  const handleMouseDown = () => {
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
    labelContainerRef.current.classList.add(styles.grabbing);
    window.addEventListener('mouseup', function cleanUp() {
      document.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', cleanUp);
      document.body.style.userSelect = 'auto';
      document.body.style.cursor = 'default';
      labelContainerRef.current.classList.remove(styles.grabbing);
    });
    document.addEventListener('mousemove', handleDrag);
  };

  return (
    <div class={styles.root}>
      <div class={[styles.leftFade, { [styles.visible]: fade.left }]} />
      <div
        ref={labelContainerRef}
        onScroll={e => {
          const labelContainer = e.target;
          setFade({
            left: labelContainer.scrollLeft !== 0,
            right: labelContainer.scrollLeft !== labelContainer.scrollWidth - labelContainer.clientWidth,
          });
        }}
        onmousedown={() => handleMouseDown()}
        class={[styles.labelsContainer, { [styles.skeleton]: labels.length === 0 }]}>
        {labels.length !== 0 &&
          labels.map((label, i) => (
            <Label
              key={i}
              title={label.text}
              active={activeLabels?.includes(label.text)}
              onClick={() => onLabelClick(label.text)}
            />
          ))}

        <IntersectionTrigger onVisible={handleScrollEnd} />

        {labels.length === 0 &&
          skeletonLabels.map((label, i) => (
            <Label
              key={i}
              title={label.text}
              active={activeLabels?.includes(label.text)}
              onClick={() => onLabelClick(label.text)}
            />
          ))}
      </div>
      <div class={[styles.rightFade, { [styles.visible]: fade.right }]} />
    </div>
  );
}

export default LabelOverview;
