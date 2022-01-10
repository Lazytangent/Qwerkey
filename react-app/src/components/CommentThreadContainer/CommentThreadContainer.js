import { useSelector } from 'react-redux';

import { session, comments as commentsSelectors } from '../../store/selectors';
import Comment from '../Comment';

const CommentsContainer = () => {
  const user = useSelector(session.user());
  const comments = useSelector(commentsSelectors.all());

  return (
    <>
      {Object.values(comments).map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          userId={user ? user.id : 0}
        />
      ))}
    </>
  );
};

export default CommentsContainer;
