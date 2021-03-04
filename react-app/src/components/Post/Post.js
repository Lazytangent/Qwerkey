import EditButton from '../parts/EditButton';
import DeleteButton from '../parts/DeleteButton';

const Post = ({ post, userId }) => {
  return (
    <div key={post.id} className="p-2 mb-2 rounded shadow-sm hover:shadow-lg">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{post.created_at}</p>
      {post.tags.map(tag => (
        <p>{tag}</p>
      ))}
      {post.images.map(url => (
        <img src={url} alt={`for ${post.title}`} />
      ))}
      {post.user.id === userId && (
        <>
          <EditButton label="Edit Post" />
          <DeleteButton label="Delete Post" />
        </>
      )}
    </div>
  );
};

export default Post;
