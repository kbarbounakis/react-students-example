import React from 'react';
import { UserService } from '../services/UserService';
import { withRouter } from '../utils';

export class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { configuration, context } = this.props.router;
    new UserService(configuration, context).logoutUser();
  }
}

export const LogoutWithRouter = withRouter(Logout)
