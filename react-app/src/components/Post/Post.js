import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { session } from '../../store/selectors';
import { savePost } from '../../store/session';
import EditButton from '../parts/EditButton';
import DeleteButton from '../parts/DeleteButton';
import EditPostModal from '../EditPostForm';
import DeleteConfirmationModal from '../parts/DeleteConfirmation';
import SaveButton from '../parts/SaveButton';
import Downvote from '../parts/Downvote';
import Upvote from '../parts/Upvote';
import Score from '../parts/Score';
import DivCard from '../parts/DivCard';
import UserName from '../parts/UserName';
import options from '../../utils/localeDateString';

const Post = ({ post }) => {
  const locationArr = useLocation().pathname.split('/');
  const dispatch = useDispatch();
  const user = useSelector(session.user());

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState();

  useEffect(() => {
    if (user) {
      setIsSaved(
        user.saved_posts.some((savedPost) => savedPost.id === post.id)
      );
      if (post.user.id !== user.id && post.ratings && post.ratings[user.id]) {
        setRating(post.ratings[user.id].rating);
      }
    }
  }, [user, post]);

  const editBtnHandler = () => {
    setShowEditModal(true);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  const saveThisPost = async () => {
    const updatedUser = await dispatch(savePost(user.id, post.id));
    if (!updatedUser.errors) {
      if (!(locationArr[1] === 'users' && locationArr[2] === String(user.id))) {
        setIsSaved((prev) => !prev);
      }
    }
  };

  return (
    <DivCard>
      <h3 className="p-2">
        <NavLink to={`/q/${post.community?.name}/${post.id}`}>
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
          by{' '}
          <UserName
            username={post.user.username}
            link={`/users/${post.user.id}`}
          />{' '}
          on{' '}
          <span className="hidden md:block">
            {new Date(post.created_at).toLocaleString(...options())}
          </span>
        </p>
        {user && (
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
      {user && post.user.id === user.id && post.body !== '[DELETED]' && (
        <div className="flex justify-end">
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
    </DivCard>
  );
};

export default Post;
