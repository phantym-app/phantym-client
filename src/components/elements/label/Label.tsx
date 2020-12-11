import { h } from 'preact';
import styles from './Label.module.scss';
import classnames from 'classnames';
import { browseContainer } from '../../../routes/Browse/browseState';

type Props = {
  title: string;
  active: boolean;
};

const Label = (props: Props) => {
  const { activeLabels, setActiveLabel } = browseContainer.useContainer();
  const { title, active } = props;
  console.log(activeLabels);
  return (
    <div
      onClick={() =>
        setActiveLabel(
          activeLabels.includes(title)
            ? activeLabels.filter((_title) => title !== _title)
            : activeLabels.concat(title),
        )
      }
      className={classnames(styles.root, { [styles.active]: active })}
    >
      <p>{title}</p>
    </div>
  );
};

export default Label;
