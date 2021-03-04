import { h } from 'preact';
import type { Props } from '../Modal';
import styles from './Filter.module.scss';

import Modal from '../Modal';
import Select from '@components/elements/select/Select';
import RangeSelect from '@components/elements/rangeSelect/RangeSelect';
import Icon from '@components/elements/icon';
import Button from '@components/elements/button/Button';

interface FilterProps extends Props {
  releaseDateFilter: { min: number; max: number };
  setReleaseDateFilter: (values: { min: number; max: number }) => any;
}

const Filter = ({ hasDimmer, origin, active, dismissModal, releaseDateFilter, setReleaseDateFilter }: FilterProps) => {
  return (
    <Modal origin={origin} active={active} dismissModal={dismissModal} hasDimmer={hasDimmer}>
      <Modal.Header title={'Filters'} />
      <Modal.Body classNames={[styles.modalBody]}>
        <div>
          <Select
            label={'compatibility'}
            options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
          />
          <Select
            label={'compatibility'}
            options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
          />
          <Select
            label={'compatibility'}
            options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
          />
          <Select
            label={'compatibility'}
            options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
          />
        </div>
        <RangeSelect
          values={releaseDateFilter}
          setValues={setReleaseDateFilter}
          title={'Release date'}
          min={1995}
          max={2021}
        />
      </Modal.Body>
      <Modal.Actions>
        <Button colour={'ghost'} onClick={() => console.warn('Clear all filters')}>
          <Icon variant={'trash'} alt={'trash'} />
          Clear all filters
        </Button>
        <Button onClick={() => console.warn('Apply filters')}>
          <Icon variant={'settings-alt'} alt={'filters'} />
          Apply filters
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Filter;
