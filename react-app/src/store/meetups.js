const SET_MAX = "meetups/SET_MAX";
const SET_MEETUPS = "meetups/SET_MEETUPS";
const SET_MEETUP = "meetups/SET_MEETUP";
const REMOVE_MEETUP = "meetups/REMOVE_MEETUP";

const setMaxNumberOfMeetups = (number) => {
  return {
    type: SET_MAX,
    number,
  };
};

const removeMeetup = (id) => {
  return {
    type: REMOVE_MEETUP,
    id,
  };
};

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

export const getMeetupLocation = (meetupId) => async (dispatch) => {
  const res = await fetch(`/api/meetups/${meetupId}/location`);
  const meetup = await res.json();
  if (!meetup.errors) {
    dispatch(setMeetup(meetup));
  }
  return meetup;
};

export const getMaxNumberOfMeetups = () => async (dispatch) => {
  const res = await fetch(`/api/meetups/max`);
  const number = await res.json();
  dispatch(setMaxNumberOfMeetups(number.max));
  return number;
};

export const createMeetup = (meetupData) => async (dispatch) => {
  const res = await fetch(`/api/meetups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meetupData),
  });
  const meetup = await res.json();
  if (!meetup.errors) {
    dispatch(setMeetup(meetup));
  }
  return meetup;
};

export const updateMeetup = (meetupData) => async (dispatch) => {
  const res = await fetch(`/api/meetups/${meetupData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meetupData),
  });
  const meetup = await res.json();
  if (!meetup.errors) {
    dispatch(setMeetup(meetup));
  }
  return meetup;
};

export const deleteMeetup = (meetupId) => async (dispatch) => {
  const res = await fetch(`/api/meetups/${meetupId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.errors) {
    dispatch(removeMeetup(meetupId));
  }
  return data;
};

const initialState = {
  meetups: {},
};

const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX:
      return { ...state, max: action.number };
    case SET_MEETUPS:
      return { ...state, meetups: { ...action.meetups } };
    case SET_MEETUP:
      return { ...state, meetups: { ...state.meetups, [action.meetup.id]: action.meetup } };
    case REMOVE_MEETUP:
      return { ...state, meetups: { ...state.meetups, [action.id]: undefined } };
    default:
      return state;
  }
};

export default meetupsReducer;
