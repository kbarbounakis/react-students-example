import React from 'react'
import { UserService } from '../services/UserService'
import { Navigate } from 'react-router';
import { withRouter } from '../utils';

export class LoginCallback extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
    this.onUserChange = props.onUserChange;
  }

  componentDidMount() {
    const { location, configuration, context } = this.props.router;
    const queryParams = new URLSearchParams(location.search)
    const accessToken = queryParams.get('access_token')
    if (accessToken != null) {
      // try current user
      new UserService(configuration, context).tryCurrentUser(accessToken).then((user) => {
        this.setState({
          user
        })
        this.onUserChange(user)
      })
    }
  }

  render() {
    if (this.state.user) {
      return <Navigate to="/dashboard"></Navigate>
    }
    return <></>
  }
}

export const LoginCallbackWithRouter = withRouter(LoginCallback)
