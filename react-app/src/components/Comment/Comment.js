import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";

import { saveComment } from "../../store/session";
import { useCommentContext } from "../../context/CommentContext";
import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditCommentModal from "../EditCommentForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";
import Downvote from "../parts/Downvote";
import Upvote from "../parts/Upvote";
import Score from "../parts/Score";
import SaveButton from "../parts/SaveButton";

const Comment = ({ comment, userId }) => {
  const location = useLocation();
  const locationArr = location.pathname.split("/");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState();

  const { setComment } = useCommentContext();

  useEffect(() => {
    if (user) {
      setIsSaved(user.saved_comments.find(savedComment => savedComment.id === comment.id));
      if (comment.user.id !== user.id && comment.ratings && comment.ratings[user.id]) {
        setRating(comment.ratings[user.id].rating);
      }
    }
  }, [user, comment]);

  const editBtnHandler = () => {
    setShowEditModal(true);
    setComment(comment);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  const saveThisComment = async () => {
    const updatedUser = await dispatch(saveComment(user.id, comment.id));
    if (!updatedUser.errors) {
      if (!(locationArr[1] === "users" && locationArr[2] === String(user.id))) {
        setIsSaved((prev) => !prev);
      }
    }
  };

  return (
    <div
      className="p-2 mb-2 rounded shadow hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out"
      key={comment.id}
    >
      <p className="p-2">{comment.body}</p>
      <hr />
      <div className="flex justify-between">
        <p className="p-2">
          by{" "}
          <NavLink to={`/users/${comment.user.id}`}>
            <span className="hover:text-green hover:underline">
              {comment.user.username}
            </span>
          </NavLink>
        </p>
        {user && comment.user.id !== user.id && (
          <SaveButton save={saveThisComment} isSaved={isSaved} />
        )}
      </div>
      {comment.user.id === userId && comment.body !== "[DELETED]" && (
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
      {user && comment.user.id !== user.id && (
        <div className="flex">
          <div className="flex justify-around p-2">
            <Downvote id={comment.id} rating={rating} type="comment" />
            <Score ratings={comment.ratings} />
            <Upvote id={comment.id} type="comment" rating={rating} />
          </div>
        </div>
      )}
      {(location.pathname === "/search" ||
        location.pathname.startsWith("/users")) && (
        <NavLink to={`/q/${comment.post.community}/${comment.post.id}`}>
          <span className="p-2 hover:text-green">Go to Post</span>
        </NavLink>
      )}
    </div>
  );
};

export default Comment;
