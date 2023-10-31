import React from "react";
import { ReactDataContext } from "@themost/react";
import { ConfigurationService } from './ConfigurationService';

export class UserService {

  constructor() {
    this.configuration = new ConfigurationService();
  }

  getCurrentUser() {
    const currentUserValue = localStorage.getItem("currentUser");
    let currentUser = null;
    if (currentUserValue) {
      currentUser = JSON.parse(currentUserValue);
    }
    return currentUser;
  }

  // eslint-disable-next-line camelcase
  async tryCurrentUser(access_token) {
    const context = new ReactDataContext(this.configuration.settings.remote.server);
    context.setBearerAuthorization(access_token);
    // get user
    const user = await context
      .model("Users/Me")
      .asQueryable()
      .expand("groups")
      .getItem();
    if (user == null) {
      return null;
    }
    // assign the given access token
    Object.assign(user, {
      // eslint-disable-next-line camelcase
      access_token: access_token
    });
    // set user
    localStorage.setItem("currentUser", JSON.stringify(user));
    // and return
    return user;
  }

  redirectToLogin() {
    window.location.href = this.loginURI;
    return <></>;
  }

  get loginURI() {
    const { authorizeURL, oauth2: {clientID, scope, callbackURL} } = this.configuration.settings.auth;   
    return `${authorizeURL}?client_id=${clientID}&response_type=token&scope=${scope.join(",")}&redirect_uri=${callbackURL}`;
  }
}
