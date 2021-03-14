import { useSelector } from "react-redux";

import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";

const UserCard = ({ user }) => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <h3>Placeholder for UserCard</h3>
      <h3>{user.username}</h3>
      <h5>Posts</h5>
      {user.posts.map(post => <Post key={post.id} post={post} />)}
      <h5>Comments</h5>
      {user.comments.map(comment => <Comment key={comment.id} comment={comment} userId={sessionUser.id} />)}
    </>
  );
};

export default UserCard;
