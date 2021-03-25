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
