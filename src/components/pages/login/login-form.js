import React from 'react';
import { Button, Input, Notification, Icon } from '@/components/ui';
// import { Redirect } from 'react-router-dom';
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      email: '',
      // error: null, // server error
      password: '',
      // response: null,
    };
  }

  handleSubmit = e => {
    // const { username, password } = this.state;
    e.preventDefault();

    this.setState({ disabled: true });

    // login(username, password)
    //   .then(response => this.setState({ disabled: false, response }))
    //   .catch(error => this.setState({ disabled: false, error }));
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, disabled } = this.state;

    // TODO bariscc: maybe we should redirect within handlesubmit and use browser history instead of this
    // if (response) {
    //   if (!response.username) {
    //     return <Redirect to="/boarding" />;
    //   }
    //   return <Redirect to="/" />;
    // }

    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {(login, { error }) => (
          <div>
            {error && <Notification styleType="danger" text={error.message} flat />}
            <form
              onSubmit={async e => {
                e.preventDefault();
                await login().then(response => {
                  setCookie('token', response.data.login.token);
                });
                this.setState({
                  email: '',
                  password: '',
                });
              }}
            >
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

export default Login;
