import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPosts } from '../../store/posts';
import Post from '../Post';

const PostsContainer = () => {
  const { communityName } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      await dispatch(getPosts(page, communityName));
    })();
  }, [dispatch, page, communityName]);

  return (
    <div>
      {Object.values(posts).map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
