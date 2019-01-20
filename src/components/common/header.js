import React from 'react';
import PropTypes from 'prop-types';
import { Link, Button, Icon, Input, Title, Paragraph, Popup } from '@/components/ui';
import throttle from 'lodash.throttle';
import cls from 'classnames';
import i18n from '@/i18n';
import Logo from '@/components/common/logo';
import LoginForm from '@/components/pages/login/login-form';
import SignupForm from '@/components/pages/login/signup-form';
import RequestResetPasswordForm from '@/components/pages/login/request-reset-password-form';
import FormTemplate from './form-template';
import NBSearchInput from '@/components/common/navbar-search-input';

const DELTA_PX = 5;
const THROTTLE_WAIT = 250;
let navbarHeight;
class Header extends React.Component {
  state = {
    headerPosition: 'static',
    isHeaderVisible: true,
    isMenuOpen: false,
    isSearchExpanded: false,
    lastScrollTop: 0,
    shownPopup: '',
  };

  componentDidMount() {
    navbarHeight = this.headerElement.clientHeight;
    this.throttledScrollHandle = throttle(this.hasScrolled, THROTTLE_WAIT);
    window.addEventListener('scroll', this.throttledScrollHandle);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandle);
  }

  getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  };

  hasScrolled = () => {
    const st = window.scrollY;
    const { lastScrollTop } = this.state;

    if (Math.abs(lastScrollTop - st) <= DELTA_PX && st > 0) return;

    if (st < lastScrollTop && st === 0) {
      // Scrolling Up
      // Set Header position back to 'static' from 'fixed' if scrolled up to top of the page
      this.setState({ headerPosition: 'static', isHeaderVisible: true });
      return;
    }
    if (st > lastScrollTop && st > navbarHeight) {
      // Scrolling Down
      // Set header position to fixed and hide it while scrolling down
      this.setState({ headerPosition: 'fixed', isHeaderVisible: false });
    } else if (st < lastScrollTop && st < this.getDocHeight()) {
      // Scrolling Up
      // Make Header visible while scrolling up
      this.setState({ isHeaderVisible: true });
    }

    this.setState({
      lastScrollTop: st,
    });
  };

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    if (!isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    this.setState({
      isMenuOpen: !isMenuOpen,
    });
  };

  toggleSearch = () => {
    const { isSearchExpanded } = this.state;
    this.setState({
      isSearchExpanded: !isSearchExpanded,
    });
  };

  togglePopup = key => {
    this.setState({
      shownPopup: key,
    });
  };

  greet = () => {
    const curHr = new Date().getHours();

    if (curHr > 5 && curHr < 12) {
      return 'Good morning';
    }
    if (curHr > 11 && curHr < 18) {
      return 'Good afternoon';
    }
    return 'Good evening';
  };

  setHeaderRef = element => {
    this.headerElement = element;
  };

  render() {
    const { inline, children, extraClassName } = this.props;
    const {
      shownPopup,
      isMenuOpen,
      isSearchExpanded,
      headerPosition,
      isHeaderVisible,
    } = this.state;

    const classes = {
      NBSearchInputWrapper: cls({
        'flex items-center lg:justify-end justify-start': true,
        'lg:w-10/12 sm:w-full md:w-8/12': isSearchExpanded,
      }),
      buttonLogin: `text-base hover:text-primary hover:font-bold sm:bg-primary sm:text-white
                    sm:hover:text-white sm:w-full sm:leading-xl sm:py-0 sm:ml-1 sm:mr-2`,
      buttonSignup: `text-base border-lightBlueGrey sm:border-lightBlueGrey sm:border-2 sm:w-full
                     sm:leading-xl sm:py-0 sm:ml-2 sm:mr-1`,
      buttonsWrapper:
        'sm:fixed sm:pin-b sm:pin-l sm:z-20 sm:bg-white sm:w-full sm:p-4 sm:flex sm:justify-around absolute pin-r',
      header: cls(
        'container flex items-center w-full h-24 sm:my-0 sm:items-start sm:flex-wrap sm:justify-between sm:h-18 sm:p-4',
        { 'sm:h-auto': isMenuOpen },
      ),
      headerBottomShadow: 'hidden sm:block absolute w-full h-4 pin-l pin-t shadow-md',
      headerPlaceHolder: 'h-24',
      headerWrapper: cls('flex justify-center nav-transition', {
        'fixed bg-white w-full pin-t pin-l z-20 shadow-md': headerPosition === 'fixed',
        'nav-up sm:nav-up shadow-none': isHeaderVisible === false,
        'sm:h-full shadow-none': isMenuOpen,
      }),
      isSearchInputCollapsedSearchIcon:
        'stroke-current text-lightBlueGrey border-none hidden sm:block mt-2',
      isSearchInputExpandedCancelButton:
        'w-2/12 h-full items-center justify-center text-base text-blueyGrey flex self-center',
      link: 'px-4 py-2 hover:font-bold sm:text-xl leading-xl py-3',
      linkColor: 'hover:text-primary',
      linksWrapper: cls(
        'sm:flex-col sm:pt-4 sm:pl-3 sm:bg-white sm:z-20',
        'sm:absolute sm:pin-t-56 sm:pin-l sm:overflow-hidden sm:w-full sm:h-screen',
        {
          'flex flex-grow sm:order-3': !isSearchExpanded,
          hidden: isSearchExpanded,
          'sm:hidden': !(isMenuOpen && isHeaderVisible),
        },
      ),
      logo: cls('wrapper sm:flex sm:justify-between mt-1 sm:order-1', {
        'sm:!hidden': isSearchExpanded,
        'sm:flex': !isSearchExpanded,
      }),
      menuIcon: cls('iconButton hidden sm:inline-block sm:order-2 p-2', {
        'sm:hidden': isSearchExpanded,
        'sm:inline-block': !isSearchExpanded,
      }),
    };

    let popupContent;
    
    if (shownPopup === 'showLogin') {
      popupContent = {
        form: <LoginForm />,
        redirect: "Don't have an account?",
        redirectAction: () => this.togglePopup('showSignup'),
        redirectLabel: 'Sign up now',
        subTitle: 'Welcome back to kommunity.app',
        title: `${this.greet()}!`,
      };
    } else if (shownPopup === 'showSignup') {
      popupContent = {
        form: <SignupForm />,
        redirect: 'Have an account?',
        redirectAction: () => this.togglePopup('showLogin'),
        redirectLabel: 'Log in now',
        subTitle: 'Discover and create amazing communities.',
        title: 'Create your account',
      };
    } else if (shownPopup === 'showResetPassword') {
      popupContent = {
        form: <RequestResetPasswordForm />,
        redirect: 'Return to',
        redirectAction: () => this.togglePopup('showLogin'),
        redirectLabel: 'sign in',
        subTitle: 'Send a reset link to your mail adress.',
        title: 'Reset Your Password',
      };
    }

    const searchInputToggleElem = (
      <div
        className={cls('hidden sm:flex sm:items-center sm:justify-center', {
          'absolute pin-r w-2/12': isSearchExpanded,
        })}
      >
        {isSearchExpanded ? (
          <Button
            onClick={this.toggleSearch}
            styleType="custom"
            extraClassName={classes.isSearchInputExpandedCancelButton}
            label={i18n.t('navbar.cancelSearch')}
            size="small"
          />
        ) : (
          <Icon
            name="Search"
            className={classes.isSearchInputCollapsedSearchIcon}
            onClick={this.toggleSearch}
          />
        )}
      </div>
    );
    return (
      <div className={classes.headerPlaceHolder}>
        <div ref={this.setHeaderRef} className={classes.headerWrapper}>
          <header className={cls(classes.header, extraClassName)}>
            <Logo extraClassName={classes.logo} />
            {inline === undefined && (
              <React.Fragment>
                <div className={classes.linksWrapper}>
                  <div className={classes.headerBottomShadow} />
                  <Link color={classes.linkColor} extraClassName={classes.link} to="/communities">
                    Communities
                  </Link>
                  <Link color={classes.linkColor} extraClassName={classes.link} to="/features">
                    Features
                  </Link>
                  <Link color={classes.linkColor} extraClassName={classes.link} to="/features">
                    Pricing
                  </Link>
                </div>
                <div
                  className={cls('relative sm:static flex', {
                    'w-5/12 sm:w-auto': !isSearchExpanded,
                    'w-full': isSearchExpanded,
                  })}
                >
                  <div className={classes.NBSearchInputWrapper}>
                    <NBSearchInput
                      expandInput={() => this.setState({ isSearchExpanded: true })}
                      shrinkInput={() => this.setState({ isSearchExpanded: false })}
                      isSearchExpanded={isSearchExpanded}
                    />
                    {/* TODO: replace div with IconButton component when it is deployed #72 icon button */}
                    {searchInputToggleElem}
                  </div>
                  <div className={classes.buttonsWrapper}>
                    <Button
                      extraClassName={classes.buttonLogin}
                      size="small"
                      styleType="custom"
                      label="Login"
                      onClick={() => this.togglePopup('showLogin')}
                    />
                    <Button
                      extraClassName={classes.buttonSignup}
                      size="small"
                      styleType="outline"
                      label="Signup"
                      onClick={() => this.togglePopup('showSignup')}
                    />
                  </div>
                </div>
                <div className={classes.menuIcon}>
                  <Icon
                    name={isMenuOpen ? 'X' : 'Menu'}
                    className="text-lightBlueGrey"
                    onClick={this.toggleMenu}
                    title={i18n.t('navbar.menu')}
                  />
                </div>
              </React.Fragment>
            )}
            {inline && <div>{children}</div>}
          </header>
          {shownPopup !== '' && (
            <Popup show wrapperExtraClassName="text-center" onClose={() => this.togglePopup('')}>
              <FormTemplate
                title={popupContent.title}
                subTitle={popupContent.subTitle}
                form={popupContent.form}
                redirect={popupContent.redirect}
                redirectLabel={popupContent.redirectLabel}
                redirectAction={popupContent.redirectAction}
              >
                {shownPopup === 'showLogin' && (
                  <Button
                    extraClassName="block font-semibold"
                    size="medium"
                    styleType="plain"
                    type="button"
                    label="Forgot Your Password?"
                    onClick={() => this.togglePopup('showResetPassword')}
                  />
                )}
              </FormTemplate>
            </Popup>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.node,
  extraClassName: PropTypes.string,
  inline: PropTypes.bool,
};

export default Header;
