import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser } from "../../store/users";
import UserCard from "../UserCard";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.users.users[userId]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
    }
  }, [user]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <UserCard user={user} />
      <h5>Posts</h5>
      {user.posts.map(post => <Post key={post.id} post={post} />)}
      <h5>Comments</h5>
      {user.comments.map(comment => <Comment key={comment.id} comment={comment} userId={sessionUser.id} />)}
    </>
  );
};

export default ProfilePage;
