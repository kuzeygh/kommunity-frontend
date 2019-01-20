import React, { Fragment } from 'react';
import { Icon } from '@/components/ui';
import PropTypes from 'prop-types';
import cls from 'classnames';

const style = {
  common:
    'ui-input inline-block w-full px-4 rounded-4 ' +
    'bg-white text-base disabled:bg-paleGrey ' +
    'focus:text-dark focus:bg-white focus:border-primary ' +
    'focus:shadow-input-primary focus:outline-none',
  errorText: 'error-text text-red my-2 leading-base',
  helpText: 'help-text text-blueyGrey leading-base',
  icon: 'h-full w-12 leading-base absolute inline-flex items-center justify-center',
  iconLeft: 'icon-left pin-l',
  iconRight: 'icon-right pin-r',
  label: 'label text-dark block leading-base mb-2 font-normal',
  state: {
    default: 'text-blueyGrey',
    error: 'text-dark border-red focus:border-red focus:shadow-input-red',
    hasIconLeft: 'pl-12',
    hasIconRight: 'pr-12',
  },
  // TODO : The class "wrapper" is not defined anywhere
  wrapper: 'wrapper relative',
};

class UIInput extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value || '',
  };

  onChangeHandler(e, onChange) {
    const { value } = e.target;
    this.setState({
      value,
    });
    /* istanbul ignore else */
    if (onChange) {
      onChange(e);
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== undefined && nextProps.value !== value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    const {
      autoComplete,
      placeholder,
      label,
      helpText,
      errorText,
      disabled,
      type,
      extraClassName,
      onChange,
      iconLeft,
      iconRight,
      initialValue,
      id,
      extraWrapperClassName,
      required,
      pattern,
      smallLeading,
      name,
      minLength,
      showBorder,
      showClearButton,
      onClick,
      setRef,
    } = this.props;
    const { value } = this.state;
    const wrapperClass = cls(style.wrapper, extraWrapperClassName);
    const inputClass = cls(style.common, extraClassName, {
      [style.state.default]: !errorText,
      [style.state.error]: errorText,
      [style.state.hasIconLeft]: iconLeft,
      [style.state.hasIconRight]: iconRight,
      'border border-lightBlueGrey': showBorder,
      'leading-2xl': !smallLeading,
      'leading-xl': smallLeading,
      'sm:border sm:border-lightBlueGrey': true,
    });

    // TODO: add labelFor
    const labelElem = label ? (
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
    ) : null;
    const iconLeftElem = iconLeft ? (
      <div className={cls(style.icon, style.iconLeft)}>{iconLeft}</div>
    ) : null;
    const iconRightElem =
      iconRight && !showClearButton ? (
        <div className={cls(style.icon, style.iconRight)}>{iconRight}</div>
      ) : null;
    const clearButton = showClearButton && (
      <div className={cls(style.icon, style.iconRight)}>
        <Icon
          onClick={() => {
            if (onChange) {
              onChange({ target: { value: '' } });
            }
            this.setState({ value: '' });
          }}
          name="X"
          className="stroke-current text-blueyGrey border-none"
        />
      </div>
    );
    const helpTextElem = helpText ? <div className={style.helpText}>{helpText}</div> : null;
    const errorTextElem = errorText ? <div className={style.errorText}>{errorText}</div> : null;
    return (
      <Fragment>
        {labelElem}
        <div className={wrapperClass}>
          {iconLeftElem}
          <input
            placeholder={placeholder}
            type={type}
            className={inputClass}
            autoComplete={autoComplete}
            disabled={disabled}
            defaultValue={initialValue}
            onChange={event => this.onChangeHandler(event, onChange)}
            required={required}
            pattern={pattern}
            minLength={minLength}
            name={name}
            value={value}
            ref={setRef}
            onClick={onClick}
            /* TODO bariscc:
              giving name as id causes an error on chrome 63+'
              when there are more than one inputs with same name on the page; for example:
              email input for subscriptions in footer conflicts with email input on signup form

              Triaged: id is now a required prop
            */
            id={id}
          />
          {iconRightElem}
          {clearButton}
        </div>
        {helpTextElem}
        {errorTextElem}
      </Fragment>
    );
  }
}
UIInput.defaultProps = {
  autoComplete: 'off',
  showBorder: true,
  type: 'text',
};

UIInput.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  extraClassName: PropTypes.string,
  extraWrapperClassName: PropTypes.string,
  helpText: PropTypes.string,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  id: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  label: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  setRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  showBorder: PropTypes.bool,
  showClearButton: PropTypes.bool,
  smallLeading: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default UIInput;
