import { useSelector } from 'react-redux';

import Comment from "../Comment";

const CommentsContainer = ({ threads }) => {
  const user = useSelector(state => state.session.user);

  return (
    <>
      {Object.values(threads).map((thread) => {
        const comments = Object.values(thread.comments);
        if (!comments.length) return null;
        return (
          <div key={comments[0].id}>
            {comments.length > 0 && (
              <Comment userId={user ? user.id : null} comment={comments[0]} key={comments[0].id} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default CommentsContainer;
