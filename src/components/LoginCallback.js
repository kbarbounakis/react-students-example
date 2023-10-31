import React from 'react'
import { UserService } from '../services/UserService'
import { Navigate } from 'react-router'


export default class LoginCallback extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount() {
    const location = window.location;
    const queryParams = new URLSearchParams(location.search)
    const accessToken = queryParams.get('access_token')
    if (accessToken != null) {
      // try current user
      new UserService().tryCurrentUser(accessToken).then((user) => {
        this.setState({
          user
        })
      })
    }
  }

  render() {
    if (this.state.user) {
      return <Navigate to="/"></Navigate>
    }
    return <></>
  }
}