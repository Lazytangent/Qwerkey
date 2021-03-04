import EditButton from '../parts/EditButton';

const Post = ({ key, post, userId }) => {
  return (
    <div key={key} className="p-2 mb-2 rounded shadow-sm hover:shadow-lg">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{post.created_at}</p>
      {post.tags.map(tag => (
        <p>{tag}</p>
      ))}
      {post.images.map(url => (
        <img src={url} alt={`for ${post.title}`} />
      ))}
      {post.user_id === userId && (
        <>
          <EditButton label="Edit Post" />
          <button>Delete Post</button>
        </>
      )}
    </div>
  );
};

export default Post;
