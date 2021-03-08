import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditPostModal from "../EditPostForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const Post = ({ post }) => {
  const user = useSelector(state => state.session.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editBtnHandler = () => {
    setShowEditModal(true);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <div key={post.id} className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-600 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
        <h3>
          <NavLink to={`/q/${post.community.name}/${post.id}`}>
            <span className="hover:underline">{post.title}</span>
          </NavLink>
        </h3>
        <p>{post.body}</p>
        <p>{post.created_at}</p>
        {post.tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
        {post.images.map((url) => (
          <img src={url} alt={`for ${post.title}`} key={url} />
        ))}
        {user && post.user.id === user.id && (
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
    </>
  );
};

export default Post;
