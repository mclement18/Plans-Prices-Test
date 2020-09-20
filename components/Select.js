import styles from '../styles/Select.module.scss';
import PropTypes from 'prop-types';

export function Option({value, label = value}) {
  return (
    <option value={value}>{label}</option>
  );
}

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default function Select({options, selected = options[0].value, onChange}) {
  return (
    <select value={selected} onChange={onChange} className={styles.select}>
      {options.map(option => <Option
                              key={typeof option.value === 'number' ?
                                option.value.toString() :
                                option.value}
                              {...option}
                              />)}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(Option.propTypes)).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
}
