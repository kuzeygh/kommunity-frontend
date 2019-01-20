import PropTypes from 'prop-types';
import React from 'react';

import { Button, Icon, Paragraph } from '@/components/ui';

class User extends React.Component {
  state = {
    editMode: false,
  };

  handleClickEdit = () => {
    const { editMode } = this.state;
    this.setState({
      editMode: !editMode,
    });
  };

  handleClickRole = () => {
    // TODO: edit role mutate using gql
    const { editMode } = this.state;
    this.setState({
      editMode: !editMode,
    });
  };

  handleClickEdit = () => {
    // TODO: edit status. mutate using gql
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
    // console.log(this.props.user);
    const { editMode } = this.state;
    return (
      <li className="flex items-center p-1 hover:bg-paleGrey">
        <div className="w-full">
          <Paragraph>
            {firstName} {lastName}
          </Paragraph>
          <Paragraph extraClassName="text-lightBlueGrey">
            Role: {role} - Status: {status}
          </Paragraph>
        </div>
        <Icon
          onClick={this.handleClickEdit}
          name="Edit"
          className="text-primary ml-3 hover:text-primaryDark cursor-pointer"
        />
        {editMode && (
          <div>
            <Button
              label={` Edit Role (${role})`}
              size="small"
              styleType="plain"
              onClick={this.handleClickRole}
            />
            <Button
              label={` Edit Status (${status})`}
              size="small"
              styleType="plain"
              onClick={this.handleClickStatus}
            />
            <Button
              label="Remove Member"
              size="small"
              styleType="plain"
              onClick={this.handleClickRemove}
            />
          </div>
        )}
      </li>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default User;
