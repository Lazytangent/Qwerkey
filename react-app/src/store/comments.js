const SET_COMMENTS = "comments/SET_COMMENTS";
const SET_COMMENT = "comments/SET_COMMENT";

const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    comments,
  };
};

const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comment,
  };
};

export const getCommentsByPost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`);
  const comments = await res.json();
  if (!comments.errors) {
    dispatch(setComments(comments));
  }
  return comments;
};

export const createComment = (comment, postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const newComment = await res.json();
  if (!newComment.errors) {
    dispatch(setComment(newComment));
  }
  return newComment;
};

const initialState = {
  comments: {},
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: { ...action.comments } };
    case SET_COMMENT:
      return { ...state, comments: { ...state.comments, [action.comment.id]: action.comment } };
    default:
      return state;
  }
};

export default commentsReducer;
