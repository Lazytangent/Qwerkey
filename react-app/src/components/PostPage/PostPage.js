import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { session, posts } from '../../store/selectors';
import { getPostById } from "../../store/posts";
import { getCommentsByPost } from "../../store/comments";
import Post from "../Post";
import CommentThreadContainer from "../CommentThreadContainer";
import CreateCommentForm from "../CreateCommentForm";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(session.user());
  const post = useSelector(posts.byId(postId));

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostById(postId));
    dispatch(getCommentsByPost(postId));
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
      {user && (
        <div>
          <CreateCommentForm userId={user.id} postId={post.id} />
        </div>
      )}
      <CommentThreadContainer />
    </>
  );
};

export default PostPage;
