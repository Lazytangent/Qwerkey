const Comment = ({ comment }) => {
  return (
    <div className="p-2 mb-2 rounded shadow max-h-36 md:max-h-96" key={comment.id}>
      <h1>{comment.body}</h1>
      <p>by {comment.user.username}</p>
    </div>
  );
};

export default Comment;
