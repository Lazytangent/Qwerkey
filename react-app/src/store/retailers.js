import {
  SET_MORE_RETAILERS,
  SET_RETAILERS,
  SET_RETAILER,
  SET_MAX_RETAILERS,
  REMOVE_RETAILER,
  SET_USER,
  SET_SEARCH,
} from './constants';
import {
  setMaxNumberOfRetailers,
  setRetailers,
  setMoreRetailers,
  setRetailer,
  removeRetailer,
} from './actions';
import api from './api';

export const getMaxNumberOfRetailers = () => async (dispatch) => {
  const res = await api('/api/retailers/max');
  const number = await res.json();
  dispatch(setMaxNumberOfRetailers(number.max));
  return number;
};

export const getRetailers = (page) => async (dispatch) => {
  const res = await api(`/api/retailers${page ? `?page=${page}` : ''}`);
  const retailers = await res.json();
  if (page === 1) {
    dispatch(setRetailers(retailers));
  } else {
    dispatch(setMoreRetailers(retailers));
  }
  return retailers;
};

export const getOneRetailer = (retailerId) => async (dispatch) => {
  const res = await api(`/api/retailers/${retailerId}`);
  const retailer = await res.json();
  dispatch(setRetailer(retailer));
  return retailer;
};

export const getOneRetailerLocation = (retailerId) => async (dispatch) => {
  const res = await api(`/api/retailers/${retailerId}/location`);
  const retailer = await res.json();
  dispatch(setRetailer(retailer));
  return retailer;
};

export const createRetailer = (retailerData) => async (dispatch) => {
  const res = await api(`/api/retailers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(retailerData),
  });
  const retailer = await res.json();
  if (!retailer.errors) {
    dispatch(setRetailer(retailer));
  }
  return retailer;
};

export const updateRetailer = (retailerData) => async (dispatch) => {
  const res = await api(`/api/retailers/${retailerData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(retailerData),
  });
  const retailer = await res.json();
  if (!retailer.errors) {
    dispatch(setRetailer(retailer));
  }
  return retailer;
};

export const deleteRetailer = (retailerId) => async (dispatch) => {
  const res = await api(`/api/retailers/${retailerId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!data.errors) {
    dispatch(removeRetailer(retailerId));
  }
  return data;
};

export const createRetailerRating =
  (rating, retailer_id) => async (dispatch) => {
    const res = await api(`/api/retailers/${retailer_id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rating),
    });
    const retailer = await res.json();
    if (!retailer.errors) {
      dispatch(setRetailer(retailer));
    }
    return retailer;
  };

export const updateRetailerRating =
  (rating, retailer_id) => async (dispatch) => {
    const res = await api(
      `/api/retailers/${retailer_id}/ratings/${rating.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rating),
      }
    );
    const retailer = await res.json();
    if (!retailer.errors) {
      dispatch(setRetailer(retailer));
    }
    return retailer;
  };

export const deleteRetailerRating =
  (rating_id, retailer_id) => async (dispatch) => {
    const res = await api(
      `/api/retailers/${retailer_id}/ratings/${rating_id}`,
      {
        method: 'DELETE',
      }
    );
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
      return {
        ...state,
        retailers: { ...state.retailers, ...action.retailers },
      };
    case SET_RETAILER:
      return {
        ...state,
        retailers: {
          ...state.retailers,
          [action.retailer.id]: action.retailer,
        },
      };
    case SET_MAX_RETAILERS:
      return { ...state, max: action.number };
    case REMOVE_RETAILER:
      return {
        ...state,
        retailers: { ...state.retailers, [action.id]: undefined },
      };
    case SET_USER:
      return {
        ...state,
        retailers: {
          ...state.retailers,
          ...Object.fromEntries(
            action.user.retailers.map((retailer) => [retailer.id, retailer])
          ),
        },
      };
    case SET_SEARCH:
      return {
        ...state,
        retailers: {
          ...state.retailers,
          ...Object.fromEntries(
            action.retailers.map((retailer) => [retailer.id, retailer])
          ),
        },
      };
    default:
      return state;
  }
};

export default retailersReducer;
