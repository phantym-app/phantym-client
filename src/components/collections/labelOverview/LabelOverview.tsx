import { h } from 'preact';
import styles from './LabelOverview.module.scss';
import classnames from 'classnames';
import Label from '../../elements/label/Label';

type Props = {
  labels: {
    title: string;
  }[];
  activeLabels?: Array<string>;
  onLabelClick?: (title: string) => void;
};

const LabelOverview = (props: Props) => {
  const { labels, onLabelClick, activeLabels } = props;
  return (
    <div className={classnames(styles.root)}>
      {labels.map((label, index) => (
        <Label
          onClick={onLabelClick && onLabelClick}
          key={index}
          title={label.title}
          active={(title: string) =>
            activeLabels && activeLabels.includes(title) ? true : false
          }
        />
      ))}
    </div>
  );
};

export default LabelOverview;
