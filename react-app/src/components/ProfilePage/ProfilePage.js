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
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users.users[userId]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setIsLoaded(false);
  }, [userId]);

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
    }
  }, [user]);

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <>
      <UserCard user={user} />
      <div className="p-2">
        <h3>Posts</h3>
        <hr />
      </div>
      {user.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div className="p-2">
        <h3>Comments</h3>
        <hr />
      </div>
      {user.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} userId={sessionUser.id} />
      ))}
      <div className="p-2">
        <h3>Retailers</h3>
        <hr />
      </div>
      {user.retailers.map((retailer) => (
        <Retailer retailer={retailer} key={retailer.id} />
      ))}
      {sessionUser.id === user.id && (
        <>
          {user.saved_posts.length > 0 && (
            <>
              <div className="p-2">
                <h3>Saved Posts</h3>
                <hr />
              </div>
              {user.saved_posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </>
          )}
          {user.saved_comments.length > 0 && (
            <>
              <div className="p-2">
                <h3>Saved Comments</h3>
                <hr />
              </div>
              {user.saved_comments.map((comment) => (
                <Comment key={comment.id} comment={comment} userId={sessionUser.id} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
