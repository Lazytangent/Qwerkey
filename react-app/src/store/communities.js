const SET_MORE_COMMUNITIES = 'communities/SET_MORE_COMMUNITIES';
const SET_COMMUNITIES = 'communities/SET_COMMUNITIES';
const SET_COMMUNITY = 'communities/SET_COMMUNITY';
const SET_MAX = 'communities/SET_MAX';

const setMaxNumberOfCommunities = (number) => {
  return {
    type: SET_MAX,
    number,
  };
};

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

export const getMaxNumberOfCommunities = () => async (dispatch) => {
  const res = await fetch('/api/communities/max');
  const number = await res.json();
  dispatch(setMaxNumberOfCommunities(number.max));
  return number;
};

export const createCommunity = (community) => async (dispatch) => {
  const res = await fetch('/api/communities', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(community),
  });
  const community = await res.json();
  if (!community.errors) {
    dispatch(setCommunity(community));
  }
  return community;
};

export const updateCommunity = (community) => async (dispatch) => {
  const res = await fetch(`/api/communities/${community.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(community),
  });
  const community = await res.json();
  if (!community.errors) {
    dispatch(setCommunity(community));
  }
  return community;
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
  communities: {},
  max: null,
};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return { ...state, communities: { ...action.communities } };
    case SET_MORE_COMMUNITIES:
      return { ...state, communities: { ...state.communities, ...action.communities } };
    case SET_COMMUNITY:
      return { ...state, communities: { ...state.communities, [action.community.id]: action.community } };
    case SET_MAX:
      return { ...state, max: action.number };
    default:
      return state;
  }
};

export default communityReducer;
