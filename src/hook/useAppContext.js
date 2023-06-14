import { useContext } from 'react';

import AppContext from '../context/App/AppDataContext';

export default function useAppContext() {
  const [appData, appActions] = useContext(AppContext);
  const { dispatch: appDispatch } = appActions;
  return {
    ...appData,
    ...appActions,
    appDispatch,
  };
}
