import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const post = useSelector(state => state.posts[postId]);

  const [isLoaded, setIsLoaded] = useState(false);

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
      <h3>Placeholder for Post Page</h3>
    </>
  );
};

export default PostPage;
