import { h } from 'preact';
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

const LabelOverview = ({ labels, onLabelClick, activeLabels }: Props) => {
  return (
    <div class={styles.root}>
      {labels.map((label, index) => (
        <Label
          onClick={onLabelClick ?? function () {}}
          key={index}
          title={label.text}
          active={(title: string) => activeLabels?.includes(title)}
        />
      ))}
    </div>
  );
};

export default LabelOverview;
