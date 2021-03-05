import { useState } from 'react';

import EditButton from '../parts/EditButton';
import DeleteButton from '../parts/DeleteButton';
import EditPostModal from '../EditPostForm';
import DeleteConfirmationModal from '../parts/DeleteConfirmation';

const Post = ({ post, userId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editBtnHandler = () => {
    setShowEditModal(true);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <div key={post.id} className="p-2 mb-2 rounded shadow-sm hover:shadow-lg">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{post.created_at}</p>
      {post.tags.map(tag => (
        <p>{tag}</p>
      ))}
      {post.images.map(url => (
        <img src={url} alt={`for ${post.title}`} key={url}/>
      ))}
      {post.user.id === userId && (
        <>
          <EditButton label="Edit Post" onClick={editBtnHandler}>
            <EditPostModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} postId={post.id} />
          </EditButton>
          <DeleteButton label="Delete Post" onClick={deleteBtnHandler}>
            <DeleteConfirmationModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} postId={post.id} />
          </DeleteButton>
        </>
      )}
    </div>
  );
};

export default Post;
