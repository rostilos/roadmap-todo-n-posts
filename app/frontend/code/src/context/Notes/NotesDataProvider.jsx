import React, { useMemo, useReducer } from 'react';
import { node } from 'prop-types';

import notesReducer from './notesReducer';
import NotesDataContext from './NotesDataContext';
import notesDispatchers from './notesDispatcher';
import initialState from './initialState';

function NotesDataProvider({ children }) {
  const [notesData, dispatch] = useReducer(notesReducer, initialState);
  const notesActions = useMemo(() => notesDispatchers(dispatch), [dispatch]);

  return (
    <NotesDataContext.Provider value={[notesData, notesActions]}>
      {children}
    </NotesDataContext.Provider>
  );
}

NotesDataProvider.propTypes = {
  children: node.isRequired,
};

export default NotesDataProvider;
