const SET_POSTS = "search/SET_POSTS";
const SET_COMMENTS = "search/SET_COMMENTS";
const SET_RETAILERS = "search/SET_RETAILERS";

const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    comments,
  };
};

const setRetailers = (retailers) => {
  return {
    type: SET_RETAILERS,
    retailers,
  };
};

export const getQuery = (queryString, type, field) => async (dispatch) => {
  const res = await fetch(`/api/search?query=${queryString}${type ? `&type=${type}` : ""}${field ? `&field=${field}` : ""}`);
  const data = await res.json();
  if (data.posts) {
    dispatch(setPosts(data.posts));
  }
  if (data.comments) {
    dispatch(setComments(data.comments));
  }
  if (data.retailers) {
    dispatch(setRetailers(data.retailers));
  }
  return data;
};

const initialState = {
  posts: [],
  comments: [],
  retailers: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.posts };
    case SET_COMMENTS:
      return { ...state, comments: action.comments };
    case SET_RETAILERS:
      return { ...state, retailers: action.retailers };
    default:
      return state;
  }
};

export default searchReducer;
