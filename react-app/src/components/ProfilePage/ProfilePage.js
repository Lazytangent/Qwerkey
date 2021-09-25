import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getUser } from "../../store/users";
import {
  users,
  session,
  posts as postsSelectors,
  comments as commentsSelectors,
  retailers as retailersSelectors,
  meetups as meetupsSelectors,
} from "../../store/selectors";
import UserCard from "../UserCard";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";
import Meetup from "../Meetup";

const ProfilePage = () => {
  const history = useHistory();
  const { userId } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector(session.user());
  const user = useSelector(users.byId(userId));
  const posts = useSelector(postsSelectors.byUser(user));
  const comments = useSelector(commentsSelectors.byUser(user));
  const retailers = useSelector(retailersSelectors.byUser(user));
  const meetups = useSelector(meetupsSelectors.byUser(user));

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const user = await dispatch(getUser(userId));
      if (user.errors) {
        history.push("/users/not-found");
      }
    })();
  }, [dispatch, userId, history]);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserCard user={user} />
      {posts.length > 0 && (
        <>
          <div className="p-2">
            <h3>Posts</h3>
            <hr />
          </div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
      {comments.length > 0 && (
        <>
          <div className="p-2">
            <h3>Comments</h3>
            <hr />
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              userId={sessionUser?.id}
            />
          ))}
        </>
      )}
      {retailers.length > 0 && (
        <>
          <div className="p-2">
            <h3>Retailers</h3>
            <hr />
          </div>
          {retailers.map((retailer) => (
            <Retailer retailer={retailer} key={retailer.id} />
          ))}
        </>
      )}
      {meetups.length > 0 && (
        <>
          <div className="p-2">
            <h3>Meetups</h3>
            <hr />
          </div>
          {meetups.map((meetup) => (
            <div key={uuidv4()}>{meetup && <Meetup meetup={meetup} />}</div>
          ))}
        </>
      )}
      {sessionUser?.id === user.id && (
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
                <Comment
                  key={comment.id}
                  comment={comment}
                  userId={sessionUser?.id}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
