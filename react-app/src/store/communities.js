import { SET_COMMUNITIES, SET_COMMUNITY, SET_SIDEBAR_COMMUNITY, SET_SIDEBAR_COMMUNITIES } from './constants';
import { setCommunities, setCommunity } from './actions';

export const getCommunities = () => async (dispatch) => {
  const res = await fetch(`/api/communities`);
  const communities = await res.json();
  dispatch(setCommunities(communities));
  return communities;
};

export const getCommunity = (communityId) => async (dispatch) => {
  const res = await fetch(`/api/communities/${communityId}`);
  const community = await res.json();
  dispatch(setCommunity(community));
  return community;
};

export const createCommunity = (community) => async (dispatch) => {
  const res = await fetch('/api/communities/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(community),
  });
  const newCommunity = await res.json();
  if (!newCommunity.errors) {
    dispatch(setCommunity(newCommunity));
  }
  return newCommunity;
};

export const updateCommunity = (community) => async (dispatch) => {
  const res = await fetch(`/api/communities/${community.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(community),
  });
  const updatedCommunity = await res.json();
  if (!updatedCommunity.errors) {
    dispatch(setCommunity(updatedCommunity));
  }
  return updatedCommunity;
};

export const deleteCommunity = (communityId) => async (dispatch) => {
  const res = await fetch(`/api/communities/${communityId}`, {
    method: "DELETE",
  });
  const communities = await res.json();
  if (!communities.errors) {
    dispatch(setCommunities(communities));
  }
  return communities;
};

const initialState = {
  byIds: {},
};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_COMMUNITIES:
    case SET_COMMUNITIES:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          ...Object.fromEntries(action.communities.map((community) => [community.id, community]))
        },
      };
    case SET_SIDEBAR_COMMUNITY:
    case SET_COMMUNITY:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [action.community.id]: action.community
        },
      };
    default:
      return state;
  }
};

export default communityReducer;
