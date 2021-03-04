import { useParams } from 'react-router-dom';

import Post from '../Post';

const PostsContainer = () => {
  const { communityName } = useParams();

  return (
    <div>
      <Post />
    </div>
  );
};

export default PostsContainer;
