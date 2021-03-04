const SET_POSTS = 'posts/SET_POSTS';
const SET_POST = 'posts/SET_POST';

const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

const setPost = (post) => {
  return {
    type: SET_POST,
    post,
  };
};

export const getPosts = (page) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/?page=${page}`);
    if (!res.ok) throw res;
    const posts = await res.json();
    dispatch(setPosts(posts));
    return posts;
  } catch (e) {
    return e;
  }
};

const initialState = {};


const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, ...action.posts };
    case SET_POST:
      return { ...state, [action.post.id]: action.post };
    default:
      return state;
  }
};

export default postsReducer;
