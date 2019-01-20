import React from 'react';
import { signup } from '@/api/request';
import { Button, Input, Link, Paragraph, Icon, Notification } from '@/components/ui';
import Recaptcha from 'react-google-recaptcha';
import { RECAPTCHA_API_KEY, mailPattern } from '@/constants';
import { Redirect } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaResponse: null,
      email: '',
      inputError: {}, // frontend validation
      password: '',
      passwordRepeat: '',
      response: null,
      serverError: null, // server validation
    };

    // reference for invisible captcha
    this.captcha = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ inputError: {}, serverError: null });

    // password match validation
    const { password, passwordRepeat, captchaResponse } = this.state;

    if (password !== passwordRepeat) {
      this.setState({ inputError: { passwordRepeat: "passwords don't match!" } });
    } else if (captchaResponse) {
      this.executeRequest();
    } else {
      this.captcha.current.execute();
    }
  };

  // make the actual call
  executeRequest = () => {
    const { email, password, captchaResponse } = this.state;

    signup(email, password, captchaResponse)
      .then(response => this.setState({ response }))
      .catch(serverError => {
        if (serverError.response) {
          this.setState({ serverError });
        } else {
          this.setState({ serverError: { message: 'Server is not responding.' } });
        }
      });
  };

  // captcha verification
  onVerify = captchaRes => {
    this.setState({ captchaResponse: captchaRes });
    this.executeRequest();
  };

  // captcha error, probably connection issue.
  onError = () => {
    this.setState({
      inputError: {
        verification: 'Error occured on verification. Check your connection and try again.',
      },
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, passwordRepeat, response, inputError, serverError } = this.state;

    // TODO bariscc: maybe we should redirect within handlesubmit and use browser history instead of this
    if (response) {
      return <Redirect to="/boarding" />;
    }

    return (
      <div>
        {serverError && <Notification styleType="danger" text={serverError.message} flat />}
        {inputError.verification && (
          <Notification styleType="danger" text={inputError.verification} flat />
        )}
        <form onSubmit={this.handleSubmit} method="POST">
          <Input
            extraClassName="w-full block"
            name="email"
            type="email"
            id="signup-email"
            placeholder="enter your e-mail"
            value={email}
            onChange={this.handleInputChange}
            pattern={mailPattern}
            required
            errorText={inputError.email}
            iconLeft={<Icon name="Mail" className="text-lightBlueGrey" />}
            extraWrapperClassName="my-4"
          />
          <Input
            extraClassName="w-full block"
            type="password"
            name="password"
            id="signup-password"
            placeholder="set a password"
            value={password}
            onChange={this.handleInputChange}
            minLength="6"
            required
            errorText={inputError.password}
            iconLeft={<Icon name="Lock" className="text-lightBlueGrey" />}
            extraWrapperClassName="my-4"
          />
          <Input
            extraClassName="w-full block"
            type="password"
            name="passwordRepeat"
            id="signup-password-repeat"
            placeholder="repeat password"
            value={passwordRepeat}
            onChange={this.handleInputChange}
            required
            errorText={inputError.passwordRepeat}
            iconLeft={<Icon name="Lock" className="text-lightBlueGrey" />}
            extraWrapperClassName="my-4"
          />
          <Recaptcha
            ref={this.captcha}
            sitekey={RECAPTCHA_API_KEY}
            size="invisible"
            onChange={this.onVerify}
            onErrored={this.onError}
          />
          <Button
            extraClassName="w-full block my-4 font-semibold"
            size="large"
            styleType="primary"
            type="submit"
            label="Sign Up"
          />
          <Paragraph className="text-blueyGrey text-xs">
            By signing up, you agree to &nbsp;
            <Link className="text-xs no-underline" color="text-primary" to="/terms-of-use">
              Terms of Use
            </Link>{' '}
            & &nbsp;
            <Link className="text-xs no-underline" color="text-primary" to="/privacy-policy">
              Privacy Policy
            </Link>
          </Paragraph>
        </form>
      </div>
    );
  }
}

export default SignupForm;
