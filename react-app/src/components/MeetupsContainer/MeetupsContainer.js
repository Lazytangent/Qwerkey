import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { getMeetups, getMaxNumberOfMeetups } from "../../store/meetups";
import Meetup from "../Meetup";

const MeetupsContainer = () => {
  const dispatch = useDispatch();
  const meetups = useSelector((state) => state.meetups.meetups);
  const maxMeetups = useSelector((state) => state.meetups.max);

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

  useEffect(() => {
    if (meetups) {
      setIsLoaded(true);
      setCurrentMeetups(Object.values(meetups));
    }
  }, [meetups]);

  useEffect(() => {
    if (page * 20 > maxMeetups) {
      setCurrentMeetups(prev => prev.concat(Object.values(meetups).slice(0, page * 20 % maxMeetups || maxMeetups)));
    }
  }, [meetups, maxMeetups, page]);

  useEffect(() => {
    const scrollListener = () => {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scroll / height);
      if (scrolled > 0.9) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [page, maxMeetups, meetups]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {currentMeetups.map(meetup => (
        <Meetup meetup={meetup} key={uuidv4()} />
      ))}
    </>
  );
};

export default MeetupsContainer;
