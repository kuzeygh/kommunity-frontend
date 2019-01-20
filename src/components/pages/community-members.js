import React from 'react';
import PropTypes from 'prop-types';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { Loading, Title, Button, Paragraph, Card } from '@/components/ui';
import UserRow from '@/containers/pages/community-members/user-row';

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
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col h-full">
            <div className="w-10/12 py-4 mx-auto">
              <Title type="h2">Community Members</Title>
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
              <Card shadow="md" applyPadding={false} extraClassName="w-full">
                <ul className="list-reset p-4">
                  <li className="flex p-1 my-2">
                    <h4 className="flex-1 mx-1">Firstname</h4>
                    <h4 className="flex-1 mx-1">Lastname</h4>
                    <h4 className="flex-1 mx-1">Role</h4>
                    <h4 className="flex-1 mx-1">Status</h4>
                    <h5 className="mx-1">Edit</h5>
                  </li>
                  {users.map(user => (
                    <UserRow user={user} key={user.uuid} />
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        )}
        <Footer />
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
