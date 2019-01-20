import React from 'react';
import { Button, Input, Notification, Icon } from '@/components/ui';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      password: '',
      retryPassword: '',
      serverError: null, // server error
    };
  }

  handleSubmit = e => {
    const { retryPassword, password } = this.state;
    e.preventDefault();

    this.setState({ serverError: null });

    if (retryPassword !== password) {
      const validationMessage = 'Passwords do not match.';
      this.setState({
        serverError: {
          message: validationMessage,
        },
      });
    }
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { password, retryPassword, disabled, serverError } = this.state;

    return (
      <div>
        {serverError && <Notification styleType="danger" text={serverError.message} flat />}
        <form onSubmit={this.handleSubmit}>
          <Input
            extraClassName="w-full block"
            type="password"
            name="password"
            id="password"
            placeholder="New Password"
            value={password}
            onChange={this.handleInputChange}
            required
            iconLeft={<Icon name="Lock" className="text-lightBlueGrey" />}
            extraWrapperClassName="my-4"
          />
          <Input
            extraClassName="w-full block"
            type="password"
            name="retryPassword"
            id="retry-password"
            placeholder="Confirm Password"
            value={retryPassword}
            onChange={this.handleInputChange}
            required
            iconLeft={<Icon name="Lock" className="text-lightBlueGrey" />}
            extraWrapperClassName="my-4"
          />
          <Button
            extraClassName="w-full block mt-4 font-semibold"
            size="large"
            styleType="primary"
            type="submit"
            label={disabled ? '...' : 'Reset Password'}
            disabled={disabled}
          />
        </form>
      </div>
    );
  }
}

export default ResetPasswordForm;
