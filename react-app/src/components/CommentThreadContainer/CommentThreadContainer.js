import { useSelector } from 'react-redux';

import Comment from "../Comment";

const CommentsContainer = () => {
  const user = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments.comments);

  return (
    <>
      {Object.values(comments).map((comment) =>
        <Comment comment={comment} userId={user.id} />
      )}
    </>
  );
};

export default CommentsContainer;
