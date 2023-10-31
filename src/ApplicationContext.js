import { createContext } from 'react';
import { ConfigurationService } from './services/ConfigurationService';
import { ReactDataContext } from '@themost/react';

const ApplicationContext = createContext({
    context: new ReactDataContext() ,
    configuration: new ConfigurationService(),
    user: null
});

export {
    ApplicationContext
}