import { useSelector } from 'react-redux';

import Comment from "../Comment";

const CommentsContainer = ({ postId }) => {
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.posts.posts[postId]);

  return (
    <>
      {Object.values(post.threads).map((thread) => {
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
