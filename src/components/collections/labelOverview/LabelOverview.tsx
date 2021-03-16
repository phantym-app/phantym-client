import type { GameLabel } from '@store/gameLibrary';

import preact, { h } from 'preact';
import styles from './LabelOverview.module.scss';
import Label from '@components/elements/label/Label';
import IntersectionTrigger from '@components/elements/intersectionTrigger/IntersectionTrigger';
import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

type Props = {
  labels: GameLabel[];
  activeLabels?: GameLabel[];
  onLabelClick?: (label: GameLabel) => void;
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
  const [sortedLabels, setSortedLabels] = useState<GameLabel[]>(labels);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  let oldMousePosition = 0;

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

  const reorderLabels = (labelElement: any, label: GameLabel) => {
    let element = labelElement;
    // in case you click on the text of the label
    if (labelElement.childNodes[0].childElementCount !== 0) {
      element = labelElement.parentElement;
    }
    const labelContainer = labelContainerRef.current;
    const labelIsActive = activeLabels.includes(label);
    const containerLeft = labelContainer.children[0].getBoundingClientRect().left;
    const elementLeft = element.getBoundingClientRect().left;
    const firstLabelPosition = containerLeft - elementLeft;

    // label is going inactive
    if (labelIsActive) {
      console.log('label is going inactive');
      // label is going active
    } else {
      // there are active elements
      if (activeLabels.length !== 0) {
        console.log('label needs to stick to last active label');
        const actives = [];
        /*@ts-ignore*/
        for (let item of labelContainer.childNodes) {
          if (item.classList.length > 1) {
            actives.push(item);
          } else {
            break;
          }
          const lastActive = actives[actives.length - 1];
          element.style.transform = `translateX(-${elementLeft - lastActive.getBoundingClientRect().right + 7.5}px)`;
          // transform to left
        }
        // there are no active elements
      } else {
        element.style.transform = `translateX(${firstLabelPosition}px)`;
        /*@ts-ignore*/
        for (let item of labelContainer.childNodes) {
          if (item !== element) {
            item.style.transform = `translateX(${element.clientWidth + 7.5}px)`;
          } else {
            break;
          }
        }
      }
    }

    setTimeout(() => {
      /*@ts-ignore*/
      for (let item of labelContainer.childNodes) {
        item.style.transition = 'unset';
        item.style.transform = 'unset';
      }
    }, 250);

    /*@ts-ignore*/
    for (let item of labelContainer.childNodes) {
      item.style.transition = '.25s ease-in-out';
    }
  };

  const handleLabelClick = (label: GameLabel, labelElement: MouseEvent) => {
    onLabelClick(label);
    reorderLabels(labelElement.target, label);
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
          activeLabels.map((label, i) => (
            <Label key={i} title={label.text} active={true} onClick={(e: MouseEvent) => handleLabelClick(label, e)} />
          ))}
        {labels.length !== 0 &&
          labels
            .filter(label => !activeLabels.includes(label))
            .map((label, i) => (
              <Label
                key={i}
                title={label.text}
                active={false}
                onClick={(e: MouseEvent) => handleLabelClick(label, e)}
              />
            ))}

        <IntersectionTrigger onVisible={handleScrollEnd} />

        {labels.length === 0 && skeletonLabels.map((label, i) => <Label key={i} title={label.text} />)}
      </div>
      <div class={[styles.rightFade, { [styles.visible]: fade.right }]} />
    </div>
  );
}

export default LabelOverview;
