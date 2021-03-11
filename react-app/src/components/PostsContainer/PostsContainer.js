import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPosts, getMaxNumberOfPosts } from '../../store/posts';
import { getCommunityByName } from "../../store/sidebar";
import Post from '../Post';

const PostsContainer = () => {
  const { communityName } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.posts.posts);
  const maxPosts = useSelector(state => state.posts.max);

  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMaxNumberOfPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPosts(page, communityName));
  }, [dispatch, page, communityName]);

  useEffect(() => {
    if (communityName) {
      dispatch(getCommunityByName(communityName));
    }
  }, [dispatch, communityName]);

  useEffect(() => {
    if (posts) {
      setIsLoaded(true);
    }
  }, [posts]);

  useEffect(() => {
    const scrollListener = () => {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scroll / height);
      if (page < maxPosts / 20 - 1 && Object.values(posts).length < maxPosts && scrolled > 0.9) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [page, maxPosts, posts]);

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
