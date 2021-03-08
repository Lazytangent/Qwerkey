import { useState } from "react";

import { useCommentContext } from "../../context/CommentContext";
import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditCommentModal from "../EditCommentForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const Comment = ({ comment, userId }) => {
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
      className="p-2 mb-2 rounded shadow max-h-36 md:max-h-96 hover:shadow-lg dark:bg-gray-600 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out"
      key={comment.id}
    >
      <h1>{comment.body}</h1>
      <p>by {comment.user.username}</p>
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
              commentId={comment.id}
            />
          </DeleteButton>
        </>
      )}
    </div>
  );
};

export default Comment;
