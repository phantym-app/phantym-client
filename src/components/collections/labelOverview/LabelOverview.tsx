import { h } from 'preact';
import styles from './LabelOverview.module.scss';
import classnames from 'classnames';
import Label from '../../elements/label/Label';
import { browseContainer } from '../../../routes/Browse/browseState';

type Props = {
  labels: {
    title: string;
  }[];
};

const LabelOverview = (props: Props) => {
  const { activeLabels } = browseContainer.useContainer();
  const { labels } = props;
  return (
    <div className={classnames(styles.root)}>
      {labels.map((label, index) => (
        <Label
          key={index}
          title={label.title}
          active={activeLabels.includes(label.title) ? true : false}
        />
      ))}
    </div>
  );
};

export default LabelOverview;
