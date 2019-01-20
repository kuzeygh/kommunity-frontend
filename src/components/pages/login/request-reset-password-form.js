/* eslint-disable react/no-unused-state */
import React from 'react';
import { Button, Input, Icon, Notification } from '@/components/ui';
import { forgotPassword } from '@/api/request';
import { mailPattern } from '@/constants';

class RequestResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      email: '',
      response: null,
      serverError: null, // server error
    };

    // reference for invisible captcha
    this.captcha = React.createRef();
  }

  handleSubmit = e => {
    const { email } = this.state;
    e.preventDefault();

    this.setState({ disabled: true, serverError: null });

    forgotPassword(email)
      .then(response => this.setState({ disabled: false, response }))
      .catch(error => this.setState({ disabled: false, serverError: error }));
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, serverError, disabled } = this.state;

    return (
      <div>
        {serverError && <Notification styleType="danger" text={serverError.message} flat />}
        <form onSubmit={this.handleSubmit}>
          <Input
            extraClassName="w-full block"
            name="email"
            type="email"
            placeholder="Mail Address"
            value={email}
            onChange={this.handleInputChange}
            pattern={mailPattern}
            required
            iconLeft={<Icon name="Mail" className="text-lightBlueGrey" />}
            extraWrapperClassName="mt-10"
          />
          <Button
            extraClassName="w-full block mt-8 font-semibold"
            size="large"
            styleType="primary"
            type="submit"
            label={disabled ? '...' : 'Reset Password'}
          />
        </form>
      </div>
    );
  }
}

export default RequestResetPasswordForm;
