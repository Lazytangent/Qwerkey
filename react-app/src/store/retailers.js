const SET_MORE_RETAILERS = 'retailers/SET_MORE_RETAILERS';
const SET_RETAILERS = 'retailers/SET_RETAILERS';
const SET_RETAILER = 'retailers/SET_RETAILER';
const SET_MAX = 'retailers/SET_MAX';

const setMaxNumberOfRetailers = (number) => {
  return {
    type: SET_MAX,
    number,
  };
};

const setMoreRetailers = (retailers) => {
  return {
    type: SET_MORE_RETAILERS,
    retailers,
  };
};

const setRetailers = (retailers) => {
  return {
    type: SET_RETAILERS,
    retailers,
  };
};

const setRetailer = (retailer) => {
  return {
    type: SET_RETAILER,
    retailer,
  };
};

export const getMaxNumberOfRetailers = () => async (dispatch) => {
  const res = await fetch('/api/retailers/max');
  const number = await res.json();
  dispatch(setMaxNumberOfRetailers(number.max));
  return number;
};

export const getRetailers = (page) => async (dispatch) => {
  const res = await fetch(`/api/retailers${page ? `?page=${page}` : ''}`);
  const retailers = await res.json();
  if (page === 1) {
    dispatch(setRetailers(retailers));
  } else {
    dispatch(setMoreRetailers(retailers));
  }
  return retailers;
};

export const getOneRetailer = (retailerId) => async (dispatch) => {
  const res = await fetch(`/api/retailers/${retailerId}`);
  const retailer = await res.json();
  dispatch(setRetailer(retailer));
  return retailer;
};

export const createRetailerRating = (rating, retailer_id) => async (dispatch) => {
  const res = await fetch(`/api/retailers/${retailer_id}/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rating),
  });
  const retailer = await res.json();
  if (!retailer.errors) {
    dispatch(setRetailer(retailer));
  }
  return retailer;
};

export const updateRetailerRating = (rating, retailer_id) => async (dispatch) => {
  const res = await fetch(`/api/retailers/${retailer_id}/ratings/${rating.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rating),
  });
  const retailer = await res.json();
  if (!retailer.errors) {
    dispatch(setRetailer(retailer));
  }
  return retailer;
};

export const deleteRetailerRating = (rating_id, retailer_id) => async (dispatch) => {
  const res = await fetch(`/api/retailers/${retailer_id}/ratings/${rating_id}`, {
    method: "DELETE",
  });
  const retailer = await res.json();
  if (!retailer.errors) {
    dispatch(setRetailer(retailer));
  }
  return retailer;
};

const initialState = {
  retailers: {},
  max: null,
};

const retailersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RETAILERS:
      return { ...state, retailers: { ...action.retailers } };
    case SET_MORE_RETAILERS:
      return { ...state, retailers: { ...state.retailers, ...action.retailers } };
    case SET_RETAILER:
      return { ...state, retailers: { ...state.retailers, [action.retailer.id]: action.retailer } };
    case SET_MAX:
      return { ...state, max: action.number };
    default:
      return state;
  }
};

export default retailersReducer;
