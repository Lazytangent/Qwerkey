import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getUser } from "../../store/users";
import { getPostsByUser } from "../../store/posts";
import { getCommentsByUser } from "../../store/comments";
import { getRetailersByUser } from "../../store/retailers";
import { getMeetupsByUser } from "../../store/meetups";
import { user as userSelectors } from '../../store/selectors';
import UserCard from "../UserCard";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";
import Meetup from "../Meetup";

const ProfilePage = () => {
  const history = useHistory();
  const { userId } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector(userSelectors.byId(userId));
  const posts = useSelector((state) => user ? user.posts.map((id) => state.posts.posts[id]) : []);
  const comments = useSelector((state) => state.comments.comments);
  const retailers = useSelector((state) => state.retailers.retailers);
  const meetups = useSelector((state) => state.meetups.meetups);

  const [isLoaded, setIsLoaded] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const user = await dispatch(getUser(userId));
      if (user.errors) {
        setInvalidUser(true);
      } else {
        await dispatch(getCommentsByUser(userId));
        await dispatch(getRetailersByUser(userId));
        await dispatch(getMeetupsByUser(userId));
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
          {Object.values(comments).map((comment) => (
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
      {Object.values(meetups).length > 0 && (
        <>
          <div className="p-2">
            <h3>Meetups</h3>
            <hr />
          </div>
          {Object.values(meetups).map((meetup) => (
            <div key={uuidv4()}>
              {meetup && <Meetup meetup={meetup} />}
            </div>
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
