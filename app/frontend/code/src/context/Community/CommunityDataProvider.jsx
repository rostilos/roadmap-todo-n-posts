import React, { useMemo, useReducer } from "react";
import { node } from "prop-types";

import communityReducer from "./communityReducer";
import CommunityDataContext from "./CommunityDataContext";
import communityDispatcher from "./communityDispatcher";
import initialState from "./initialState";

function CommunityDataProvider({ children }) {
  const [communityData, dispatch] = useReducer(communityReducer, initialState);
  const communityActions = useMemo(() => communityDispatcher(dispatch), [dispatch]);

  return (
    <CommunityDataContext.Provider value={[communityData, communityActions]}>{children}</CommunityDataContext.Provider>
  );
}

CommunityDataProvider.propTypes = {
  children: node.isRequired,
};

export default CommunityDataProvider;
