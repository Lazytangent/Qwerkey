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

export const getCommentsByUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/comments`);
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

export const updateComment = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const updatedComment = await res.json();
  if (!updatedComment.errors) {
    dispatch(setComment(updatedComment))
  }
  return updatedComment;
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  const deletedComment = await res.json();
  if (!deletedComment.errors) {
    dispatch(setComment(deletedComment));
  }
  return deletedComment;
};

export const rateComment = ({ rating, userId, commentId }) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating,
      user_id: userId,
    }),
  });
  const comment = await res.json();
  if (!comment.errors) {
    dispatch(setComment(comment));
  }
  return comment;
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
