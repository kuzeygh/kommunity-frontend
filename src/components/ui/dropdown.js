import React, { Component} from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Icon } from './index';

const style = {
  disabled: 'text-blueyGrey hover:text-blueyGrey cursor-not-allowed',
  icon: 'ml-2 text-battleshipGrey',
  selected: 'wrapper flex items-center text-battleshipGrey hover:text-primary cursor-pointer',
  wrapper: 'ui-dropdown relative',
  card: 'absolute mt-2 border-blueyGrey bg-white p-1 rounded shadow-md pin-x',
  list: 'list-reset',
  item: 'px-3 py-2 hover:bg-paleGrey cursor-pointer',
};


class Dropdown extends Component {
  state = {
    selectedOption: this.props.selectedOption,
    showDropdown: false,
  };

  componentDidMount = () => {
    // TODO find a better way to detect clicks
    // on label, and items in the dropdown
    window.addEventListener('click', (e) => {
      if (e.target.className.indexOf('dropdown-item') === -1 &&
      e.target.innerHTML !== 'Pick one') {
        this.setState({showDropdown: false})
      }
    })
  }

  onChangeHandlerFactory = id => {
    const {onSelect, options} = this.props;
    return (e) => {
      this.setState({
        selectedOption: options.find(option => option.id === id).value,
        showDropdown: false,
      });
      /* istanbul ignore else */
      if (onSelect) {
        onSelect(id);
      }
    }
  }

  toggleDropdown = () => {
    if (!this.props.disabled) {
      this.setState({ showDropdown: !this.state.showDropdown });
    }
  }

  render() {
    const {
      disabled, extraClassName, options, placeholder,
    } = this.props;
    const { selectedOption, showDropdown } = this.state;

    return (
      <div className={cls(style.wrapper, extraClassName)}>
        <div
          className={cls(style.selected, {[style.disabled]: disabled})}
          onClick={this.toggleDropdown}
        >
          <span>
            {selectedOption || placeholder}
          </span>
          <Icon
            className={cls(style.icon, {[style.disabled]: disabled})}
            name="ChevronDown" />
        </div>
          {showDropdown && (
            <div className={style.card}>
              <ul className={style.list}>
                {options.map(option => (
                  <li className={cls('dropdown-item', style.item)} onClick={this.onChangeHandlerFactory(option.id)}>
                    {option.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  disabled: false,
  extraClassName: '',
  selectedOption: null,
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  extraClassName: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  selectedOption: PropTypes.object,
};

export default Dropdown;
