import { h, Fragment } from 'preact';
import styles from './LabelOverview.module.scss';
import Label from '@components/elements/label/Label';

type Props = {
  labels: {
    text: string;
    popularity: number;
  }[];
  activeLabels?: string[];
  onLabelClick?: (title: string) => void;
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

const LabelOverview = ({ labels, onLabelClick = function () {}, activeLabels }: Props) => (
  <div class={styles.root}>
    <div class={[styles.labelsContainer, { [styles.skeleton]: labels.length === 0 }]}>
      {(labels.length === 0 ? skeletonLabels : labels).map((label, index) => (
        <Label
          key={index}
          title={label.text}
          active={activeLabels?.includes(label.text)}
          onClick={() => onLabelClick(label.text)}
        />
      ))}
    </div>
    <div class={styles.fade} />
  </div>
);

export default LabelOverview;
