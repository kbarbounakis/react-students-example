import { ApplicationContext } from './ApplicationContext';
import { useContext } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      let {configuration, context} = useContext(ApplicationContext)
      return (
        <Component
          {...props}
          router={{ location, navigate, params, configuration, context }}
        />
      );
    }
    return ComponentWithRouterProp
  }