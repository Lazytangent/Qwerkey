const SET_COMMUNITIES = 'sidebar/SET_COMMUNITIES';
const SET_COMMUNITY = "sidebar/SET_COMMUNITY";

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

export const getPopularCommunities = () => async (dispatch) => {
  const res = await fetch(`/api/communities/popular`);
  const communities = await res.json();
  dispatch(setCommunities(communities));
  return communities;
};

export const getCommunityByName = (name) => async (dispatch) => {
  const res = await fetch(`/api/communities/${name}`);
  const community = await res.json();
  if (!community.errors) {
    dispatch(setCommunity(community));
  }
  return community;
};

const initialState = {
  popular: [],
  community: {},
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return { ...state, popular: action.communities };
    case SET_COMMUNITY:
      return { ...state, community: action.community };
    default:
      return state;
  }
};

export default sidebarReducer;
