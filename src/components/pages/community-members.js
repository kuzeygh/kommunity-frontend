import React from 'react';
import PropTypes from 'prop-types';

import Header from '@/components/common/header';
import { Loading, Title, Button, Paragraph } from '@/components/ui';
import User from './community-members/user';

// eslint-disable-next-line react/no-multi-comp
class CommunityMembers extends React.Component {
  handleClickInvite() {
    // TODO: get users using gql and list
  }

  render() {
    const {
      communityMembers: { loading = true, getCommunityMembers: { name = '', users } = {} } = {},
    } = this.props;

    if (!users) {
      return null;
    }

    return (
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col h-full">
            <div className="bg-gray-gradient">
              <div className="container">
                <Header />
              </div>
            </div>
            <div className="container">
              <div className="container py-4">
                <Title type="h2">Community Members</Title>
              </div>
              <div className="container py-4">
                <Paragraph>
                  <span>{name}</span>
                  <Button
                    label="Invite Members"
                    size="small"
                    styleType="outline"
                    onClick={this.handleClickInvite}
                    extraClassName="m-4"
                  />
                </Paragraph>
                <Title type="h5">Users</Title>
                <div className="flex">
                  <ul className="list-reset py-4">
                    {users.map(user => (
                      <User user={user} key={user.uuid} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

CommunityMembers.propTypes = {
  communityMembers: PropTypes.shape({
    getCommunityMembers: PropTypes.object,
    name: PropTypes.string,
    users: PropTypes.object,
  }),
};

export default CommunityMembers;
