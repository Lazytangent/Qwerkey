const SET_MAX = "users/SET_MAX";

const setMaxNumberOfUsers = (number) => {
  return {
    type: SET_MAX,
    number,
  };
};

export const getUsers = (page) => async (dispatch) => {

};

export const getMaxNumberOfUsers = () => async (dispatch) => {
  const res = await fetch('/api/users/max');
  const number = await res.json();
  dispatch(setMaxNumberOfUsers(number.max));
  return number;
};

const initialState = {
  users: {},
  max: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX:
      return { ...state, max: action.number };
    default:
      return state;
  }
};

export default usersReducer;
