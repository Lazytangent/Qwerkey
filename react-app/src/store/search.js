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
      return { ...state, retailers: aciton.retailers };
    default:
      return state;
  }
};

export default searchReducer;
