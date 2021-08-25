import { SET_SESSION, REMOVE_SESSION } from './constants';

// Session Actions
export const setSession = (user) => {
  return {
    type: SET_SESSION,
    user,
  };
};

export const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};
