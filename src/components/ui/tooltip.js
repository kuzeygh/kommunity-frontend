/* eslint-disable sort-keys */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const style = {
  common: 'ui-tooltip absolute text-white',
  placements: {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
  },
  state: {
    closed: 'hidden',
    open: 'inline-block',
  },
  wrapper: 'tooltip-wrapper relative inline-block',
  tooltipOuter: 'absolute flex items-end',
  content: {
    common: 'tooltip-content px-2 py-1 rounded leading-base font-light whitespace-no-wrap',
    default: 'bg-gunmetal',
    error: 'bg-red',
  },
  triangle: {
    wrapper: 'flex',
    placements: {
      center: 'justify-center',
      left: 'justify-start ml-4',
      right: 'justify-end mr-4',
    },
    default: 'triangle-after-black_tooltip',
    error: 'triangle-after-red_tooltip',
  },
};

class UITooltip extends Component {
  state = {
    open: false,
  };

  handleMouseEnter = () => {
    this.setState({ open: true });
  };

  handleMouseLeave = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const openState = open ? 'open' : 'closed';
    const {
      children,
      content,
      error,
      extraClassName,
      extraWrapperClassName,
      placement,
    } = this.props;

    const wrapperClass = cls(style.wrapper, extraWrapperClassName);
    const tooltipOuterClass = cls(style.tooltipOuter, style.placements[placement]);
    const tooltipClass = cls(style.common, style.state[openState]);
    const contentClass = cls(style.content.common, extraClassName, {
      [style.content.default]: !error,
      [style.content.error]: error,
    });
    const triangleWrapperClass = cls(style.triangle.wrapper, style.triangle.placements[placement]);
    const triangleClass = cls({
      [style.triangle.default]: !error,
      [style.triangle.error]: error,
    });
    return (
      <div
        className={wrapperClass}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={tooltipOuterClass}>
          <div className={tooltipClass}>
            <div className={contentClass}>{content}</div>
            <div className={triangleWrapperClass}>
              <div className={triangleClass} />
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

UITooltip.defaultProps = {
  placement: 'left',
};

UITooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  content: PropTypes.string,
  error: PropTypes.bool,
  extraClassName: PropTypes.string,
  extraWrapperClassName: PropTypes.string,
  placement: PropTypes.oneOf(['center', 'left', 'right']),
};

export default UITooltip;
