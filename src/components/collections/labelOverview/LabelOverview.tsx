import { h } from 'preact';
import styles from './LabelOverview.module.scss';
import Label from '@components/elements/label/Label';

type Props = {
  labels: {
    title: string;
  }[];
  activeLabels?: Array<string>;
  onLabelClick?: (title: string) => void;
};

const LabelOverview = ({ labels, onLabelClick, activeLabels }: Props) => {
  return (
    <div class={styles.root}>
      {labels.map((label, index) => (
        <Label
          onClick={onLabelClick && onLabelClick}
          key={index}
          title={label.title}
          active={(title: string) => (activeLabels && activeLabels.includes(title) ? true : false)}
        />
      ))}
    </div>
  );
};

export default LabelOverview;
