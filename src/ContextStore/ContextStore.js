import React from 'react';
import PropTypes from 'prop-types';


import rootReducer from './RootReducer';
import { ManageLocalStorage } from '../Utils/ManageLocalStorage';
import { GlobalContext, GlobalDispatchContext } from './ContextAPI';

const ContextStore = ({ children }) => {
  const userDetails = ManageLocalStorage.get('userDetails');
  const initialState = {
    loginState: {
      userDetails: userDetails || {},
      isLoggedIn: !!userDetails.email,
    },
    loadingState: {
      isLoading: false
    }
  };

  const [globalState, dispatch] = React.useReducer(rootReducer, initialState);
  return (
    <GlobalContext.Provider value={globalState}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};
export default ContextStore;
ContextStore.propTypes = {
  children: PropTypes.object
};
