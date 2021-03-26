import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { getMeetups, getMaxNumberOfMeetups } from "../../store/meetups";
import Meetup from "../Meetup";

const MeetupsContainer = () => {
  const dispatch = useDispatch();
  const meetups = useSelector((state) => state.meetups.meetups);
  const maxMeetups = useSelector((state) => state.meeups.max);

  const [page, setPage] = useState(1);
  const [currentMeetups, setCurrentMeetups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMaxNumberOfMeetups());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMeetups(1));
  }, [dispatch]);

  useEffect(() => {
    if (page * 20 - maxMeetups < 20) {
      dispatch(getMeetups(page));
    }
  }, [dispatch, page, maxMeetups]);

  return (
    <>
      {Object.values(meetups).map(meetup => (
        <Meetup meetup={meetup} key={uuidv4()} />
      ))}
    </>
  );
};

export default MeetupsContainer;
