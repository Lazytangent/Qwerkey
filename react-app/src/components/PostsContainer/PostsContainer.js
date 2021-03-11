import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPosts } from '../../store/posts';
import { getCommunityByName } from "../../store/sidebar";
import Post from '../Post';

const PostsContainer = () => {
  const { communityName } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.posts);
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getPosts(page, communityName));
      await dispatch(getCommunityByName(communityName));
    })();
  }, [dispatch, page, communityName]);

  useEffect(() => {
    if (posts) {
      setIsLoaded(true);
    }
  }, [posts]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      {Object.values(posts).map(post => (
        <Post key={post.id} post={post} userId={user ? user.id : null} />
      ))}
    </div>
  );
};

export default PostsContainer;
