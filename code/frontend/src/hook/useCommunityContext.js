import { useContext } from "react";

import CommunityDataContext from "../context/Community/CommunityDataContext";

export default function useCommunityContext() {
  const [communityData, communityActions] = useContext(CommunityDataContext);
  const { dispatch: communityDispatch } = communityActions;
  return {
    ...communityData,
    ...communityActions,
    communityDispatch,
  };
}
