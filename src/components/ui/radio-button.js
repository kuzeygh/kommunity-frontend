import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

const RadioButton = props => {
  const { disabled, extraClassName, label, onChange, selected, size, value, name } = props;
  const style = {
    container: [
      'text-blueyGrey m-1 flex items-center',
      { 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled },
    ],
    customRadio: {
      common: cls('flex items-center justify-center rounded-full border focus:outline-none', {
        'border-primary': selected && !disabled,
        'focus:border-2': !disabled,
        'focus:border-blueyGrey border-lightBlueGrey': !selected && !disabled,
        'opacity-60 bg-paleGrey': disabled,
      }),
      medium: 'w-6 h-6',
      small: 'w-4 h-4',
    },
    inside: {
      common: [
        'rounded-full',
        {
          'bg-blueyGrey': selected && disabled,
          'bg-primary': selected && !disabled,
          hidden: !selected,
        },
      ],
      medium: 'h-2 w-2',
      small: 'h-2 w-2',
    },
    label: {
      common: ['ml-2', { 'cursor-pointer': !disabled }],
      medium: 'text-lg',
      small: 'text-sm',
    },
    radio: 'absolute invisible',
  };

  // TODO there could be multiple elements with the same value on the page.
  // We should refactor id/htmlFor below.
  return (
    <label htmlFor={value} className={cls(style.container, extraClassName)}>
      <input
        id={value}
        type="radio"
        value={value}
        onClick={onChange}
        className={cls(style.radio)}
        defaultChecked={selected}
        disabled={disabled}
        name={name}
      />
      <div
        className={cls(style.customRadio.common, style.customRadio[size])}
        tabIndex={0}
        role="radio"
        aria-checked="false"
      >
        <div className={cls(style.inside[size], style.inside.common)} />
      </div>
      <p className={cls(style.label.common, style.label[size])}>{label}</p>
    </label>
  );
};

RadioButton.defaultProps = {
  size: 'medium',
};

RadioButton.propTypes = {
  // RadioButtonGroup overrides disabled key, don't use it
  disabled: PropTypes.bool,
  extraClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  value: PropTypes.string,
};

export default RadioButton;
