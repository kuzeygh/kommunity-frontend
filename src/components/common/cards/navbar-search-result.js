import React from 'react';
import PropTypes from 'prop-types';
import { Link, Loading } from '@/components/ui';
import NBSearchResultItem from './navbar-search-result-item';
import testAvatar from '@/components/ui/test-avatar';

const style = {
  item: {
    common: 'dropdown-item flex items-center justify-center py-2 select-none',
    link: 'cursor-pointer leading-base active:text-primary',
  },
  list: 'list-reset',
  messages: {
    error: 'leading-base text-red',
    loading: 'text-center my-3',
  },
  title: {
    text: 'leading-base text-blueyGrey text-xs',
    wrapper: 'dropdown-item flex items-center justify-start px-2 cursor-default select-none',
  },
  wrapper: 'pin-x absolute mt-2 bg-white p-4 rounded-4 shadow-md w-full',
};

const MAX_SHOWN_COMMUNITIES = 3;
const MAX_SHOWN_USERS = 2;
const SearchResults = ({ error, communities, users, loading }) => {
  // TODO handle error message
  if (error) {
    return (
      <div className={style.wrapper}>
        <ul className={style.list}>
          <li className={style.item.common}>
            <p className={style.messages.error}>Error!!!</p>
          </li>
        </ul>
      </div>
    );
  }
  if (loading) {
    return (
      <div className={style.wrapper}>
        <ul className={style.list}>
          <li className={style.item.common}>
            <div className={style.messages.loading}>
              <Loading />
            </div>
          </li>
        </ul>
      </div>
    );
  }
  if (communities.length === 0 && users.length === 0) {
    return (
      <div className={style.wrapper}>
        <ul className={style.list}>
          <li className={style.item.common}>
            <p>Community and User not found</p>
          </li>
        </ul>
      </div>
    );
  }
  const seeAllResults = (communities.length > MAX_SHOWN_COMMUNITIES ||
    users.length > MAX_SHOWN_USERS) && (
    <li className={style.item.common}>
      <Link extraClassName={style.item.link} to="/see-all-result-page">
        See all resaults
      </Link>
    </li>
  );
  return (
    <div className={style.wrapper}>
      <ul className={style.list}>
        <React.Fragment>
          {communities && communities.length > 0 && (
            <React.Fragment>
              <li className={style.title.wrapper}>
                <p className={style.title.text}>COMMUNITIES</p>
              </li>
              {communities.slice(0, MAX_SHOWN_COMMUNITIES).map((option, index) => (
                <NBSearchResultItem
                  labels={{
                    firstLine: option.name,
                    secondLine: option.tagline,
                  }}
                  imgUrl={testAvatar}
                  type="communities"
                  key={index.toString()}
                  onClick={() => {}}
                />
              ))}
            </React.Fragment>
          )}
          {users && users.length > 0 && (
            <React.Fragment>
              <li className={style.title.wrapper}>
                <p className={style.title.text}>USERS</p>
              </li>
              {users.slice(0, MAX_SHOWN_USERS).map((option, index) => (
                <NBSearchResultItem
                  labels={{
                    firstLine: `${option.firstName} ${option.lastName}`,
                    secondLine: `@${option.username}`,
                  }}
                  imgUrl={testAvatar}
                  type="users"
                  key={index.toString()}
                  onClick={() => {}}
                />
              ))}
            </React.Fragment>
          )}
          {seeAllResults}
        </React.Fragment>
      </ul>
    </div>
  );
};
SearchResults.propTypes = {
  communities: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      subMes: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      subMes: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};
export default SearchResults;
