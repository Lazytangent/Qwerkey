import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPostById } from '../../store/posts';

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts[postId]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
      <h3>{post.title}</h3>
    </>
  );
};

export default PostPage;
