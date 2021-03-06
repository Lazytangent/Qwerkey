import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPostById } from '../../store/posts';
import Post from '../Post';
import CommentThreadContainer from '../CommentThreadContainer';

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.posts[postId]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setIsLoaded(true);
    }
  }, [post]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Post post={post} />
      <CommentThreadContainer threads={post.threads} />
    </>
  );
};

export default PostPage;
