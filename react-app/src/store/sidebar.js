const SET_COMMUNITIES = 'sidebar/SET_COMMUNITIES';

const setCommunities = (communities) => {
  return {
    type: SET_COMMUNITIES,
    communities,
  };
};

export const getPopularCommunities = () => async (dispatch) => {
  const res = await fetch(`/api/communities/popular`);
  const communities = await res.json();
  dispatch(setCommunities(communities));
  return communities;
};

const initialState = {
  popular: [],
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return { popular: action.communities };
    default:
      return state;
  }
};

export default sidebarReducer;
