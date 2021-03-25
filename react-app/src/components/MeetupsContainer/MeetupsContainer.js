import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { getMeetups } from "../../store/meetups";
import Meetup from "../Meetup";

const MeetupsContainer = () => {
  const dispatch = useDispatch();
  const meetups = useSelector((state) => state.meetups.meetups);

  useEffect(() => {
    dispatch(getMeetups(1));
  }, [dispatch]);

  return (
    <>
      {Object.values(meetups).map(meetup => (
        <Meetup meetup={meetup} key={uuidv4()} />
      ))}
    </>
  );
};

export default MeetupsContainer;
