import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AuthUserContext } from "./AuthUserProvider";

const withAuthorization = (locWhenAuth?: string, locWhenUnauth?: string) => (
  Component: React.ComponentType
) => {
  const AuthorizationWrapperComponent: React.FC = (props) => {
    const authUser = useContext(AuthUserContext);
    const history = useHistory();

    useEffect(() => {
      if (authUser!.data) {
        if (locWhenAuth) history.replace(locWhenAuth);
      } else {
        if (locWhenUnauth) history.replace(locWhenUnauth);
      }
    }, [authUser,history]);

    return <Component {...props} />;
  };

  return AuthorizationWrapperComponent;
};

export default withAuthorization;
