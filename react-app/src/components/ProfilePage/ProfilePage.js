import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser } from "../../store/users";
import UserCard from "../UserCard";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
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
      <h3>Placeholder for ProfilePage</h3>
      <UserCard />
    </>
  );
};

export default ProfilePage;
