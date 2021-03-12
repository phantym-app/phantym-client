import type { GameLabel } from '@store/gameLibrary';

import { h } from 'preact';
import styles from './LabelOverview.module.scss';
import Label from '@components/elements/label/Label';
import IntersectionTrigger from '@components/elements/intersectionTrigger/IntersectionTrigger';
import { useState, useRef, useReducer, useCallback } from 'preact/hooks';

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
  const [leftFade, setLeftFade] = useState<boolean>(false);
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

  return (
    <div ref={labelContainerRef} class={styles.root}>
      <div class={[styles.leftFade, { [styles.visible]: leftFade }]} />
      <div
        ref={labelContainerRef}
        onScroll={e => setLeftFade(e.target.scrollLeft !== 0)}
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
      <div class={styles.rightFade} />
    </div>
  );
}

export default LabelOverview;
