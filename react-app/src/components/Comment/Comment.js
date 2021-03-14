import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { useCommentContext } from "../../context/CommentContext";
import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditCommentModal from "../EditCommentForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const Comment = ({ comment, userId }) => {
  const location = useLocation();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { setComment } = useCommentContext();

  const editBtnHandler = () => {
    setShowEditModal(true);
    setComment(comment);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <div
      className="p-2 mb-2 rounded shadow md:max-h-36 md:max-h-96 hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out"
      key={comment.id}
    >
      <p className="p-2">{comment.body}</p>
      <hr />
      <p className="p-2">by <NavLink to={`/users/${comment.user.id}`}><span className="hover:text-green hover:underline">{comment.user.username}</span></NavLink></p>
      {comment.user.id === userId && (
        <>
          <EditButton label="Edit Comment" onClick={editBtnHandler}>
            <EditCommentModal
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
            />
          </EditButton>
          <DeleteButton label="Delete Comment" onClick={deleteBtnHandler}>
            <DeleteConfirmationModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              id={comment.id}
              type="comment"
            />
          </DeleteButton>
        </>
      )}
      {(location.pathname === "/search" || location.pathname.startsWith("/users")) && (
        <NavLink to={`/q/${comment.post.community}/${comment.post.id}`}>
          <span className="p-2 hover:text-green">
            Go to Post
          </span>
        </NavLink>
      )}
    </div>
  );
};

export default Comment;
