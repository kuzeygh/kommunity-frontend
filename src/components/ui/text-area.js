import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const style = {
  common:
    'ui-textarea inline-block border border-lightBlueGrey w-full px-4 rounded-4 ' +
    'bg-white leading-base text-base disabled:bg-paleGrey ' +
    'focus:text-dark focus:bg-white focus:border-primary ' +
    'focus:shadow-input-primary focus:outline-none py-3',
  errorText: 'error-text text-red my-2 leading-base',
  helpText: 'help-text text-gray leading-base',
  label: 'label text-black block leading-base mb-2 font-normal',
  state: {
    default: 'text-blueyGrey',
    error: 'text-dark border-red focus:border-red focus:shadow-input-red',
  },
  wrapper: 'wrapper relative',
};

class UITextArea extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
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

  render() {
    const {
      placeholder,
      label,
      helpText,
      errorText,
      disabled,
      extraClassName,
      onChange,
      extraWrapperClassName,
      id,
      rows,
    } = this.props;

    const { value } = this.state;

    const wrapperClass = cls(style.wrapper, extraWrapperClassName);
    const inputClass = cls(style.common, extraClassName, {
      [style.state.default]: !errorText,
      [style.state.error]: errorText,
    });

    // TODO: add labelFor
    const labelElem = label ? (
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
    ) : null;
    const helpTextElem = helpText ? <div className={style.helpText}>{helpText}</div> : null;
    const errorTextElem = errorText ? <div className={style.errorText}>{errorText}</div> : null;
    return (
      <Fragment>
        {labelElem}
        <div className={wrapperClass}>
          <textarea
            rows={rows}
            id={id}
            placeholder={placeholder}
            className={inputClass}
            disabled={disabled}
            value={value}
            onChange={event => this.onChangeHandler(event, onChange)}
          />
        </div>
        {helpTextElem}
        {errorTextElem}
      </Fragment>
    );
  }
}

UITextArea.defaultProps = {
  rows: 3,
};

UITextArea.propTypes = {
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  extraClassName: PropTypes.string,
  extraWrapperClassName: PropTypes.string,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
};

export default UITextArea;
