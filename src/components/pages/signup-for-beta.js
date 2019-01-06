/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Header from '../common/header';
import bottomLeft from './img/bottom-left.svg';
import bottomRight from './img/bottom-right.svg';
import topLeft from './img/top-left.svg';
import illustration from './img/illustration.svg';
import windowIllustration from './img/window.svg';
import { Title, Paragraph, Button, Input, Popup } from '@/components/ui';
import { mailPattern } from '@/constants';

const commonStyles = {
  backgroundRepeat: 'no-repeat',
  objectFit: 'contain',
};

const backgroundElements = [
  {
    className: 'absolute pin-b pin-l',
    style: {
      ...commonStyles,
      height: '232px',
      width: '261px',
    },
    svg: bottomLeft,
  },
  {
    className: 'absolute pin-b pin-r',
    style: {
      ...commonStyles,
      height: '526px',
      width: '521px',
    },
    svg: bottomRight,
  },
  {
    className: 'absolute pin-t pin-l',
    style: {
      ...commonStyles,
      height: '189px',
      width: '191px',
    },
    svg: topLeft,
  },
];

const styles = {
  shareButtons: 'w-full mx-2 h-14 font-bold',
  subscribeButton:
    'absolute text-white font-bold w-4/12 pin-r pin-t h-full bg-primary rounded-tr-full rounded-br-full',
  subscribeInput:
    'border focus:border-primary focus:text-dark w-full h-14 border-lightBlueGrey rounded-full',
};

class SignupBeta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      subscribePopup: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      subscribePopup: true,
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClosePopup = () => {
    this.setState({
      subscribePopup: false,
    });
  };

  render() {
    const { email, subscribePopup } = this.state;
    return (
      <React.Fragment>
        {backgroundElements.map((element, i) => (
          <div
            className={element.className}
            key={i.toString()}
            style={{ backgroundImage: `url(${element.svg})`, ...element.style }}
          />
        ))}
        <div className="container">
          <Header extraClassName="justify-between" inline>
            <Paragraph extraClassName="text-blueyGrey">
              Beta program will launch as soon as possible
            </Paragraph>
          </Header>
          <div className="flex mt-32">
            <div className="w-2/4 pr-12">
              <Title type="h2" extraClassName="font-bold my-8">
                Join, Start and Create Online Communities
              </Title>
              <Paragraph type="2xl" extraClassName="text-battleshipGrey mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsa voluptate.
              </Paragraph>
              <form onSubmit={this.handleSubmit}>
                <Paragraph type="base" extraClassName="text-battleshipGrey mb-1">
                  Signup for beta:
                </Paragraph>
                <div className="input-group relative">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    pattern={mailPattern}
                    extraClassName={styles.subscribeInput}
                    placeholder="Mail Address"
                  />
                  <Button
                    extraClassName={styles.subscribeButton}
                    styleType="primary"
                    size="medium"
                    label="Subscribe"
                    type="submit"
                  />
                </div>
              </form>
            </div>
            <div className="w-2/4 pl-12">
              <img className="pointer-events-none" src={illustration} alt="Hey!" />
            </div>
          </div>
        </div>
        <Popup
          show={subscribePopup}
          wrapperExtraClassName="text-center"
          onClose={this.onClosePopup}
        >
          <img className="pointer-events-none" src={windowIllustration} alt="Hey!" />
          <Title type="h5" extraClassName="font-extrabold mt-6 mb-2">
            Thanks for signing up!
          </Title>
          <Paragraph extraClassName="mb-8">Show some love for makers :)</Paragraph>
          <div className="buttons flex justify-around">
            <Button
              extraClassName={styles.shareButtons}
              backgroundColor="#00aced"
              styleType="primary"
              size="medium"
              label="Tweet"
              type="button"
              iconLeft="Twitter"
            />
            <Button
              extraClassName={styles.shareButtons}
              backgroundColor="#3a5a98"
              styleType="primary"
              size="medium"
              label="Share"
              type="button"
              iconLeft="Facebook"
            />
          </div>
        </Popup>
      </React.Fragment>
    );
  }
}

export default SignupBeta;
