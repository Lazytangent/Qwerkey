import Comment from '../Comment';

const CommentsContainer = ({ threads }) => {
  return (
    <>
      {Object.values(threads).map(thread =>
        Object.values(thread.comments).map(comment => (
          <Comment comment={comment} />
        ))
      )}
    </>
  );
};

export default CommentsContainer;
