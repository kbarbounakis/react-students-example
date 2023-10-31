import React from "react";
import { ReactDataContext } from "@themost/react";
import { ConfigurationService } from './ConfigurationService';

export class UserService {

  /**
   * @param {ConfigurationService} configuration
   * @param {ReactDataContext} context
   */
  constructor(configuration, context) {
    this.configuration = configuration;
    this.context = context;
  }

  getUser() {
    const currentUserValue = sessionStorage.getItem("currentUser");
    let currentUser = null;
    if (currentUserValue) {
      currentUser = JSON.parse(currentUserValue);
    }
    return currentUser;
  }

  logoutUser() {
    sessionStorage.removeItem("currentUser");
    const { logoutURL } = this.configuration.settings.auth;
    window.location.href = logoutURL;
  }

  // eslint-disable-next-line camelcase
  async tryCurrentUser(access_token) {
    this.context.setBearerAuthorization(access_token);
    // get user
    const user = await this.context
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
    sessionStorage.setItem("currentUser", JSON.stringify(user));
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
