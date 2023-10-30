import React from "react";
import { UserService } from "../services/UserService";
import { Navigate } from "react-router";

export default class LoginCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    const location = this.props.location;
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");
    if (accessToken != null) {
      // try current user
      new UserService().tryCurrentUser(accessToken).then((user) => {
        this.setState({
          user,
        });
      });
    }
  }

  render() {
    const hasUser = this.state.user;
    if (hasUser) {
      return <Navigate to="/" />;
    }
    return <></>;
  }
}
