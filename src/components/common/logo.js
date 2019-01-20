import React from 'react';
import PropTypes from 'prop-types';

import { Link, Img } from '@/components/ui';

const Logo = props => {
  const { extraClassName } = props;
  const logoPath = '/images/kommunity-logo.svg';
  return (
    <Link className={extraClassName} to="/">
      <Img src={logoPath} height="100%" width="100%" />
    </Link>
  );
};

Logo.propTypes = {
  extraClassName: PropTypes.string,
};

export default Logo;
