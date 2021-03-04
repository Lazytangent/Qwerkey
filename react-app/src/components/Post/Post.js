const Post = ({ key, post, userId }) => {
  return (
    <div key={key}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{post.created_at}</p>
      {post.tags.map(tag => (
        <p>{tag}</p>
      ))}
      {post.iamges.map(url => (
        <img src={url} alt={`for ${post.title}`} />
      ))}
      {post.user_id === userId && (
        <>
          <button>Edit Post</button>
          <button>Delete Post</button>
        </>
      )}
    </div>
  );
};

export default Post;
