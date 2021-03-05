import Comment from "../Comment";

const CommentsContainer = ({ threads }) => {
  return (
    <>
      {Object.values(threads).map((thread) => {
        const comments = Object.values(thread.comments);
        if (!comments.length) return null;
        return (
          <div key={comments[0].id}>
            {comments.length > 0 && (
              <Comment comment={comments[0]} key={comments[0].id} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default CommentsContainer;
