import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { CHANGE_ROLE, CHANGE_STATUS } from '@/components/pages/requests';
import UserRow from '@/components/pages/community-members/user-row';

const mapStateToProps = () => ({});
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(
  compose(
    graphql(CHANGE_ROLE, { name: 'changeRole' }),
    graphql(CHANGE_STATUS, { name: 'changeStatus' }),
  )(UserRow),
);
