import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getMeetupById, getMeetupLocation } from "../../store/meetups";
import Meetup from "../Meetup";
import Map from "../Map";

const MeetupPage = () => {
  const { meetupId } = useParams();

  const dispatch = useDispatch();
  const meetup = useSelector((state) => state.meetups.meetups[meetupId]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMeetupById(meetupId));
  }, [dispatch, meetupId]);

  useEffect(() => {
    (async () => {
      if (meetup) {
        if (!(meetup.lng || meetup.lat)) {
          await dispatch(getMeetupLocation(meetupId));
        }
        setIsLoaded(true);
      }
    })();
  }, [dispatch, meetup, meetupId]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Meetup meetup={meetup} />
      {meetup.lng && meetup.lat && (
        <Map long={meetup.lng} lat={meetup.lat} />
      )}
    </>
  );
};

export default MeetupPage;
