import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();

  return (
    <>
      <h3>Placeholder for Post Page</h3>
    </>
  );
};

export default PostPage;
