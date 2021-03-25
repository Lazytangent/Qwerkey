import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getUser } from "../../store/users";
import { getPostsByUser } from "../../store/posts";
import { getRetailersByUser } from "../../store/retailers";
import UserCard from "../UserCard";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";

const ProfilePage = () => {
  const history = useHistory();
  const { userId } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users.users[userId]);
  const posts = useSelector((state) => state.posts.posts);
  const comments = useSelector((state) => state.comments.comments);
  const retailers = useSelector((state) => state.retailers.retailers);

  const [isLoaded, setIsLoaded] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const user = await dispatch(getUser(userId));
      if (user.errors) {
        setInvalidUser(true);
      } else {
        await dispatch(getPostsByUser(userId));
        await dispatch(getRetailersByUser(userId));
        setIsLoaded(true);
      }
    })();
  }, [dispatch, userId]);

  useEffect(() => {
    setIsLoaded(false);
  }, [userId]);

  useEffect(() => {
    if (invalidUser) {
      history.push("/users/not-found");
    }
  }, [invalidUser, history]);

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <>
      <UserCard user={user} />
      {Object.values(posts).length > 0 && (
        <>
        <div className="p-2">
          <h3>Posts</h3>
          <hr />
        </div>
          {Object.values(posts).map((post) => (
              <Post key={post.id} post={post} />
          ))}
        </>
      )}
      {Object.values(comments).length > 0 && (
        <>
          <div className="p-2">
            <h3>Comments</h3>
            <hr />
          </div>
          {user.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} userId={sessionUser?.id} />
          ))}
        </>
      )}
      {Object.values(retailers).length > 0 && (
        <>
        <div className="p-2">
          <h3>Retailers</h3>
          <hr />
        </div>
          {Object.values(retailers).map((retailer) => (
              <Retailer retailer={retailer} key={retailer.id} />
          ))}
        </>
      )}
      {sessionUser && sessionUser.id === user.id && (
        <>
          {sessionUser.saved_posts.length > 0 && (
            <>
              <div className="p-2">
                <h3>Saved Posts</h3>
                <hr />
              </div>
              {sessionUser.saved_posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </>
          )}
          {sessionUser.saved_comments.length > 0 && (
            <>
              <div className="p-2">
                <h3>Saved Comments</h3>
                <hr />
              </div>
              {sessionUser.saved_comments.map((comment) => (
                <Comment key={comment.id} comment={comment} userId={sessionUser?.id} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
