import React from 'react';
import { withRouter } from 'react-router';
import { Button, Input, Notification, Icon } from '@/components/ui';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { setCookie } from '@/api/local-storage';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      uuid
      email
      token
    }
  }
`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      email: '',
      error: null, // server error
      password: '',
      // response: null,
    };
  }

  handleSubmit = async (e, login) => {
    const { history } = this.props;
    e.preventDefault();

    this.setState({ disabled: true });

    await login()
      .then(response => {
        setCookie('token', response.data.login.token);
        this.setState({
          error: '',
        });
        history.push('/boarding');
      })
      .catch(error => {
        this.setState({
          error,
        });
      })
      .finally(() => {
        this.setState({
          disabled: false,
        });
      });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, disabled, error } = this.state;

    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {login => (
          <div>
            {error && <Notification styleType="danger" text={error.message} flat />}
            <form onSubmit={e => this.handleSubmit(e, login)}>
              <Input
                extraClassName="w-full block"
                name="email"
                type="text"
                id="login-username"
                placeholder="your username"
                value={email}
                onChange={this.handleInputChange}
                required
                iconLeft={<Icon name="User" className="text-lightBlueGrey" />}
                extraWrapperClassName="my-4"
              />
              <Input
                extraClassName="w-full block"
                type="password"
                name="password"
                id="login-password"
                placeholder="your password"
                value={password}
                onChange={this.handleInputChange}
                required
                iconLeft={<Icon name="Lock" className="text-lightBlueGrey" />}
                extraWrapperClassName="my-4"
              />
              <Button
                extraClassName="w-full block my-4 font-semibold"
                size="large"
                styleType="primary"
                type="submit"
                label={disabled ? '...' : 'Login'}
                disabled={disabled}
              />
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Login);
