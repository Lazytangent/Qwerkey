import {
  SET_MORE_POSTS,
  SET_POSTS,
  SET_POST,
  SET_MAX,
  SET_ORDER,
} from "./constants";
import {
  setMaxNumberOfPosts,
  setMorePosts,
  setPosts,
  setPost,
  setOrderOfPosts,
} from "./actions";

export const getOrder = (type) => async (dispatch) => {
  const res = await fetch(`/api/posts/filter?type=${type}`);
  const array = await res.json();
  dispatch(setOrderOfPosts(array));
  return array;
};

export const getMaxNumberOfPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/max");
  const number = await res.json();
  dispatch(setMaxNumberOfPosts(number.max));
  return number;
};

export const getMaxNumberOfPostsByCommunity =
  (communityName) => async (dispatch) => {
    const res = await fetch(`/api/posts/max/${communityName}`);
    const number = await res.json();
    dispatch(setMaxNumberOfPosts(number.max));
    return number;
  };

export const getPosts = (page, communityName) => async (dispatch) => {
  try {
    const res = await fetch(
      `/api/posts?page=${page}${
        communityName ? `&community_name=${communityName}` : ""
      }`
    );
    if (!res.ok) throw res;
    const posts = await res.json();
    if (page === 1) {
      dispatch(setPosts(posts));
    } else {
      dispatch(setMorePosts(posts));
    }
    return posts;
  } catch (e) {
    return e;
  }
};

export const getPostById = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`);
  const post = await res.json();
  if (!post.errors) {
    dispatch(setPost(post));
  }
  return post;
};

export const getPostsByUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/posts`);
  const posts = await res.json();
  if (!posts.errors) {
    dispatch(setPosts(posts));
  }
  return posts;
};

export const createPost = (post) => async (dispatch) => {
  const { title, body, images, userId, communityId } = post;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user_id", userId);
  formData.append("community_id", communityId);
  if (images) {
    for (const list of images) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }

  try {
    const res = await fetch("/api/posts/", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const updatePost = (post) => async (dispatch) => {
  const { title, body, images, postId, userId, communityId } = post;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user_id", userId);
  formData.append("community_id", communityId);
  if (images) {
    for (const list of images) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }

  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const ratePost =
  ({ rating, userId, postId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        user_id: userId,
      }),
    });
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  };

const initialState = {
  posts: {},
  max: null,
  order: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MORE_POSTS:
      return { ...state, posts: { ...state.posts, ...action.posts } };
    case SET_POSTS:
      return { ...state, posts: { ...action.posts } };
    case SET_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.post.id]: action.post },
      };
    case SET_MAX:
      return { ...state, max: action.number };
    case SET_ORDER:
      return { ...state, order: action.array };
    default:
      return state;
  }
};

export default postsReducer;
