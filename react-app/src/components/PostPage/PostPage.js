import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPostById } from '../../store/posts';
import Post from '../Post';
import CommentsContainer from '../CommentsContainer';

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.posts[postId]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post && user) {
      setIsLoaded(true);
    }
  }, [post, user]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Post post={post} userId={user ? user.id : null} />
      <CommentsContainer threads={post.threads} />
    </>
  );
};

export default PostPage;
