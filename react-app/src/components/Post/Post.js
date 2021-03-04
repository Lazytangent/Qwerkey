const Post = ({ key, post }) => {
  return (
    <div key={key}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
