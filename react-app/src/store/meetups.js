const SET_MEETUPS = "meetups/SET_MEETUPS";
const SET_MEETUP = "meetups/SET_MEETUP";

const setMeetups = (meetups) => {
  return {
    type: SET_MEETUPS,
    meetups,
  };
};

const setMeetup = (meetup) => {
  return {
    type: SET_MEETUP,
    meetup,
  };
};

export const getMeetups = (page) => async (dispatch) => {
  const res = await fetch(`/api/meetups?page=${page}`);
  const meetups = await res.json();
  if (!meetups.errors) {
    dispatch(setMeetups(meetups));
  }
  return meetups;
};

export const getMeetupById = (meetupId) => async (dispatch) => {
  const res = await fetch(`/api/meetups/${meetupId}`);
  const meetup = await res.json();
  if (!meetup.errors) {
    dispatch(setMeetup(meetup));
  }
  return meetup;
};

const initialState = {
  meetups: {},
};

const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default meetupsReducer;
