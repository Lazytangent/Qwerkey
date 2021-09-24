import {
  SET_MEETUPS,
  SET_MORE_MEETUPS,
  SET_MEETUP,
  SET_MAX_MEETUPS,
  REMOVE_MEETUP,
  SET_USER,
} from "./constants";

const setMoreMeetups = (meetups) => {
  return {
    type: SET_MORE_MEETUPS,
    meetups,
  };
};

const setMaxNumberOfMeetups = (number) => {
  return {
    type: SET_MAX_MEETUPS,
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
    if (page === 1) {
      dispatch(setMeetups(meetups));
    } else {
      dispatch(setMoreMeetups(meetups));
    }
  }
  return meetups;
};

export const getMeetupsByUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/meetups`);
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
  max: null,
};

const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_MEETUPS:
      return { ...state, max: action.number };
    case SET_MORE_MEETUPS:
      return { ...state, meetups: { ...state.meetups, ...action.meetups } };
    case SET_MEETUPS:
      return { ...state, meetups: { ...action.meetups } };
    case SET_MEETUP:
      return {
        ...state,
        meetups: { ...state.meetups, [action.meetup.id]: action.meetup },
      };
    case REMOVE_MEETUP:
      return {
        ...state,
        meetups: { ...state.meetups, [action.id]: undefined },
      };
    case SET_USER:
      return {
        ...state,
        meetups: {
          ...state.meetups,
          ...Object.fromEntries(action.user.meetups.map((meetup) => [meetup.id, meetup])),
        },
      };
    default:
      return state;
  }
};

export default meetupsReducer;
