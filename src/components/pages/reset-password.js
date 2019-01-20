import React from 'react';
import PropTypes from 'prop-types';
import Header from '@/components/common/header';
import { withRouter } from 'react-router';
import { Button } from '@/components/ui';
import ResetPasswordForm from '@/components/pages/login/reset-password-form';
import FormTemplate from '../common/form-template';

const ResetPassword = props => {
  const { history } = props;
  return (
    <div className="container">
      <Header extraClassName="justify-between" inline>
        Remember your password?
        <Button
          extraClassName="font-medium text-base pl-2 pr-2"
          size="small"
          styleType="plain"
          label="Log in now."
          onClick={() => history.push('/login')} // todo: this should do something, but what?
        />
      </Header>
      <div className="w-82 m-0 mx-auto">
        <FormTemplate
          title="Reset Password"
          subTitle="Enter a new password"
          form={<ResetPasswordForm />}
        />
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

export default withRouter(ResetPassword);
