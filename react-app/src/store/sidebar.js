import { SET_SIDEBAR_COMMUNITY, SET_SIDEBAR_COMMUNITIES } from './constants';
import { setSidebarCommunity, setSidebarCommunities } from './actions';
import api from './api';

export const getSidebarPopularCommunities = () => async (dispatch) => {
  const res = await api(`/api/communities/popular`);
  const communities = await res.json();
  dispatch(setSidebarCommunities(communities));
  return communities;
};

export const getSidebarCommunity = (name) => async (dispatch) => {
  const res = await api(`/api/communities/${name}`);
  const community = await res.json();
  if (!community.errors) {
    dispatch(setSidebarCommunity(community));
  }
  return community;
};

const initialState = {
  popular: [],
  community: null,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_COMMUNITIES:
      return { ...state, popular: action.communities.map(({ id }) => id) };
    case SET_SIDEBAR_COMMUNITY:
      return { ...state, community: action.community.id };
    default:
      return state;
  }
};

export default sidebarReducer;
