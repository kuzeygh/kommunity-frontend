import React from 'react';
import PropTypes from 'prop-types';

class RadioButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.RBGroup = React.createRef();
    this.state = {
      selectedValue: props.initialValue || undefined,
    };
  }

  onChange = value => {
    return () => {
      this.setState({ selectedValue: value });
    };
  };

  render() {
    const { selectedValue } = this.state;
    const { disabled, extraClassName, children } = this.props;
    let name = '';
    if (this.RBGroup.current) {
      name = `${this.RBGroup.current.getBoundingClientRect().x}-${
        this.RBGroup.current.getBoundingClientRect().y
      }`;
    }
    const newRadioButtons = React.Children.map(children, child => {
      return React.cloneElement(child, {
        disabled,
        name,
        onChange: this.onChange(child.props.value),
        selected: selectedValue === child.props.value,
      });
    });

    return (
      <div className={extraClassName} ref={this.RBGroup}>
        {newRadioButtons}
      </div>
    );
  }
}

RadioButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  disabled: PropTypes.bool,
  extraClassName: PropTypes.string,
  initialValue: PropTypes.string,
};

export default RadioButtonGroup;
