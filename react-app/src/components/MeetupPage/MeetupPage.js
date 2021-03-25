import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getMeetupById } from "../../store/meetups";
import Meetup from "../Meetup";
import Map from "../Map";

const MeetupPage = () => {
  const { meetupId } = useParams();
  const dispatch = useDispatch();
  const meetup = useSelector((state) => state.meetups.meetups[meetupId]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getMeetupById(meetupId));
  }, [dispatch, meetupId]);

  return (
    <>
      <Meetup meetup={meetup} />
    </>
  );
};

export default MeetupPage;
