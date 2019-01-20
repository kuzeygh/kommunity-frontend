import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import NBSearchResult from '@/components/common/cards/navbar-search-result';
import { NAVBAR_SEARCH } from '@/containers/query';

const NavbarSearchResultContainer = ({ queryText }) => (
  <Query query={NAVBAR_SEARCH(queryText)}>
    {({ loading, error, data }) => {
      return (
        <NBSearchResult
          communities={data.searchCommunities}
          users={data.searchUsers}
          loading={loading}
          error={error}
        />
      );
    }}
  </Query>
);
NavbarSearchResultContainer.propTypes = {
  queryText: PropTypes.string,
};
export default NavbarSearchResultContainer;
