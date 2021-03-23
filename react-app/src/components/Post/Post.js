import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { savePost } from "../../store/session";
import EditButton from "../parts/EditButton";
import DeleteButton from "../parts/DeleteButton";
import EditPostModal from "../EditPostForm";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";
import SaveButton from "../parts/SaveButton";
import Downvote from "../parts/Downvote";
import Upvote from "../parts/Upvote";
import Score from "../parts/Score";
import options from "../../utils/localeDateString";

const Post = ({ post }) => {
  const locationArr = useLocation().pathname.split("/");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState();

  useEffect(() => {
    if (user) {
      setIsSaved(user.saved_posts.some(savedPost => savedPost.id === post.id));
      if (post.user.id !== user.id && post.ratings && post.ratings[user.id]) {
        setRating(post.ratings[user.id].rating);
      }
    }
  }, [user, post]);

  const editBtnHandler = async () => {
    setShowEditModal(true);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  const saveThisPost = async () => {
    const updatedUser = await dispatch(savePost(user.id, post.id));
    if (!updatedUser.errors) {
      if (!(locationArr[1] === "users" && locationArr[2] === String(user.id))) {
        setIsSaved(prev => !prev);
      }
    }
  };

  return (
    <div
      key={post.id}
      className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out"
    >
      <h3 className="p-2">
        <NavLink to={`/q/${post.community.name}/${post.id}`}>
          <span className="hover:underline">{post.title}</span>
        </NavLink>
      </h3>
      <p className="p-2">{post.body}</p>
      {post.tags.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}
      {post.images.map((url) => (
        <img src={url} alt={`for ${post.title}`} key={url} />
      ))}
      <hr />
      <div className="flex items-center justify-between p-2">
        <p>
          by <NavLink to={`/users/${post.user.id}`}><span className="hover:text-green hover:underline">{post.user.username}</span></NavLink> on{" "}
          <span className="hidden md:block">{new Date(post.created_at).toLocaleString(...options())}</span>
        </p>
        {user && post.user.id === user.id && post.body !== "[DELETED]" && (
          <div>
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
                id={post.id}
                type="post"
              />
            </DeleteButton>
          </div>
        )}
        {user && post.user.id !== user.id && (
          <div className="flex">
            <div className="flex justify-around p-2">
              <Downvote id={post.id} type="post" rating={rating} />
              <Score ratings={post.ratings} />
              <Upvote id={post.id} type="post" rating={rating} />
            </div>
            <SaveButton save={saveThisPost} isSaved={isSaved} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
