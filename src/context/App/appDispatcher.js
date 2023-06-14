import {
  setCurrentMonthAction,
  setCurrentYearAction,
  setSelectedDateAction,
} from './calendar/actions';

import {
  setNotesDataAction,
  setShowNotesContentAction,
  setShowAllNotesAction,
} from './notes/actions';

const dispatchMapper = {
  setCurrentMonth: setCurrentMonthAction,
  setCurrentYear: setCurrentYearAction,
  setShowNotesContent: setShowNotesContentAction,
  setNotesData: setNotesDataAction,
  setSelectedDate: setSelectedDateAction,
  setShowAllNotes: setShowAllNotesAction,
};

export default function appDispatcher(dispatch) {
  const dispatchers = { dispatch };

  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(
      null,
      dispatch
    );
  });

  return dispatchers;
}
