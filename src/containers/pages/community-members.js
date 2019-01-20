import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import { FETCH_COMMUNITY_MEMBERS } from '@/components/pages/requests';
import CommunityMembers from '@/components/pages/community-members';

const mapStateToProps = () => ({});
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(
  graphql(FETCH_COMMUNITY_MEMBERS, {
    name: 'communityMembers',
    options: props => ({
      variables: {
        uuid: props.match.params.communityUuid,
      },
    }),
  })(CommunityMembers),
);
