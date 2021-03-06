import { useState } from "react";
import { NavLink } from "react-router-dom";

import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditPostModal from "../EditPostForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";
import CreateCommentForm from "../CreateCommentForm";

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
    <div>
      <div key={post.id} className="p-2 mb-2 rounded shadow-sm hover:shadow-lg">
        <NavLink to={`/q/${post.community.name}/${post.id}`}>
          <h3 className="hover:underline">{post.title}</h3>
        </NavLink>
        <p>{post.body}</p>
        <p>{post.created_at}</p>
        {post.tags.map((tag) => (
          <p>{tag}</p>
        ))}
        {post.images.map((url) => (
          <img src={url} alt={`for ${post.title}`} key={url} />
        ))}
        {post.user.id === userId && (
          <>
            <EditButton label="Edit Post" onClick={editBtnHandler}>
              <EditPostModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                postId={post.id}
              />
            </EditButton>
            <DeleteButton label="Delete Post" onClick={deleteBtnHandler}>
              <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                postId={post.id}
              />
            </DeleteButton>
          </>
        )}
      </div>
      <div>
        {userId && post.user.id !== userId && (
          <CreateCommentForm postId={post.id} />
        )}
      </div>
    </div>
  );
};

export default Post;
