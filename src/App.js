import "./styles.css";
import Dashboard from "./layouts/Dashboard";
import "./i18n";
import { ApplicationContext } from './ApplicationContext';
import { ConfigurationService } from './services/ConfigurationService';
import { ReactDataContext } from '@themost/react';
import { UserService } from './services/UserService';


export default function App() {
  const configuration = new ConfigurationService();
  const context =  new ReactDataContext(configuration.settings.remote.server);
  const userService = new UserService(configuration, context);
  const user = userService.user;
  
  if (user != null) {
    context.setBearerAuthorization(user.access_token);
  }
  const value = {configuration, context, user}
  return (
    <>
      <ApplicationContext.Provider value={value}>
        <Dashboard />
      </ApplicationContext.Provider>
    </>
  );
}
