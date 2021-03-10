const SET_MORE_COMMUNITIES = 'communities/SET_MORE_COMMUNITIES';
const SET_COMMUNITIES = 'communities/SET_COMMUNITIES';
const SET_COMMUNITY = 'community/SET_COMMUNITY';

const setMoreCommunities = (communities) => {
  return {
    type: SET_MORE_COMMUNITIES,
    communities,
  };
};

const setCommunities = (communities) => {
  return {
    type: SET_COMMUNITIES,
    communities,
  };
};

const setCommunity = (community) => {
  return {
    type: SET_COMMUNITY,
    community,
  };
};

export const getCommunities = (page) => async (dispatch) => {
  const res = await fetch(`/api/communities${page ? `?page=${page}` : ''}`);
  const communities = await res.json();
  if (page === 1) {
    dispatch(setCommunities(communities));
  } else {
    dispatch(setMoreCommunities(communities));
  }
  return communities;
};

export const getCommunity = (communityId) => async (dispatch) => {
  const res = await fetch(`/api/communities/${communityId}`);
  const community = await res.json();
  dispatch(setCommunity(community));
  return community;
};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return { ...action.communities };
    case SET_MORE_COMMUNITIES:
      return { ...state, ...action.communities };
    case SET_COMMUNITY:
      return { ...state, [action.community.id]: action.community };
    default:
      return state;
  }
};

export default communityReducer;
