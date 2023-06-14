import React, { useMemo, useReducer } from 'react';
import { node } from 'prop-types';

import appReducer from './appReducer';
import AppDataContext from './AppDataContext';
import appDispatchers from './appDispatcher';
import initialState from './initialState';

function AppDataProvider({ children }) {
  const [appData, dispatch] = useReducer(appReducer, initialState);
  const appActions = useMemo(() => appDispatchers(dispatch), [dispatch]);

  return (
    <AppDataContext.Provider value={[appData, appActions]}>
      {children}
    </AppDataContext.Provider>
  );
}

AppDataProvider.propTypes = {
  children: node.isRequired,
};

export default AppDataProvider;
