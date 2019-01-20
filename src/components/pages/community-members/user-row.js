import PropTypes from 'prop-types';
import React from 'react';

import { Dropdown, Icon } from '@/components/ui';

class UserRow extends React.Component {
  state = {
    editMode: false,
  };

  handleSelectStatus = status => {
    const { changeStatus, user } = this.props;
    // TODO: update user status through gql on backend
    changeStatus({
      variables: {
        status,
        userUuid: user.uuid,
      },
    })
      // TODO handle errors
      .then(() => {})
      .catch(() => {});
  };

  handleSelectRole = role => {
    const { changeRole, user } = this.props;
    // TODO: update user role through gql on backend
    changeRole({
      variables: {
        role,
        userUuid: user.uuid,
      },
    })
      // TODO handle errors
      .then(() => {})
      .catch(() => {});
  };

  handleClickEdit = () => {
    const { editMode } = this.state;
    this.setState({
      editMode: !editMode,
    });
  };

  render() {
    const {
      user: {
        firstName,
        lastName,
        CommunityUser: { role, status },
      },
    } = this.props;
    const { editMode } = this.state;
    return (
      <li className="flex items-center text-left p-1 hover:bg-paleGrey">
        <div className="flex-1 mx-1">{firstName}</div>
        <div className="flex-1 mx-1">{lastName}</div>
        <div className="flex-1 mx-1">
          {editMode ? (
            <Dropdown
              options={[
                { id: 'owner', value: 'owner' },
                { id: 'member', value: 'member' },
                { id: 'moderator', value: 'moderator' },
              ]}
              selectedOption={role}
              onSelect={this.handleSelectRole}
            />
          ) : (
            <div className="flex-1 mx-1">{role}</div>
          )}
        </div>
        <div className="flex-1 mx-1">
          {editMode ? (
            <Dropdown
              options={[
                { id: 'approved', value: 'approved' },
                { id: 'banned', value: 'banned' },
                { id: 'invited', value: 'invited' },
              ]}
              selectedOption={status}
              onSelect={this.handleSelectStatus}
            />
          ) : (
            <div className="flex-1 mx-1">{status}</div>
          )}
        </div>
        <div className="mx-1">
          <Icon
            onClick={this.handleClickEdit}
            name="Edit"
            className="text-primary hover:text-primaryDark cursor-pointer"
          />
        </div>
      </li>
    );
  }
}

UserRow.propTypes = {
  changeRole: PropTypes.func,
  changeStatus: PropTypes.func,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default UserRow;
