import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const style = {
  desc: 'leading-base text-blueyGrey',
  img: {
    common: 'bg-cover inline-block w-12 h-12 mr-4',
    communities: 'rounded-8',
    users: 'rounded-full',
  },
  title: 'leading-base text-dark group-hover:text-primary group-hover:font-bold',
  wrapper: 'dropdown-item flex items-center rounded-8 p-4 hover:bg-paleGrey cursor-pointer group',
};
const Item = ({ labels, type, onClick, imgUrl }) => (
  <li className={style.wrapper} onClick={onClick}>
    <div
      className={cls(style.img.common, style.img[type])}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    />
    <div>
      <p className={style.title}>{labels.firstLine}</p>
      <p className={style.desc}>{labels.secondLine}</p>
    </div>
  </li>
);
Item.propTypes = {
  imgUrl: PropTypes.string,
  labels: PropTypes.shape({
    firsLine: PropTypes.string,
    secondLine: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Item;
