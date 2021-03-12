import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

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
  const [currentPosts, setCurrentPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMaxNumberOfPosts());
  }, [dispatch]);

  useEffect(() => {
    if (page * 20 - maxPosts < 20) {
      dispatch(getPosts(page, communityName));
    }
  }, [dispatch, page, communityName, maxPosts]);

  useEffect(() => {
    if (communityName) {
      dispatch(getCommunityByName(communityName));
    }
  }, [dispatch, communityName]);

  useEffect(() => {
    if (posts) {
      setIsLoaded(true);
      setCurrentPosts(Object.values(posts));
    }
  }, [posts]);

  useEffect(() => {
    if (page * 20 > maxPosts) {
      setCurrentPosts(prev => prev.concat(Object.values(posts).slice(0, page * 20 % maxPosts)));
    }
  }, [posts, maxPosts, page]);

  useEffect(() => {
    const scrollListener = () => {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scroll / height);
      if (scrolled > 0.9) {
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
      {currentPosts.map(post => (
        <Post key={uuidv4()} post={post} userId={user ? user.id : null} />
      ))}
    </div>
  );
};

export default PostsContainer;
