const SET_RETAILERS = 'retailers/SET_RETAILERS';
const SET_RETAILER = 'retailers/SET_RETAILER';

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

export const getRetailers = (page) => async (dispatch) => {
  const res = await fetch(`/api/retailers/${page ? `?page=${page}` : ''}`);
  const retailers = await res.json();
  if (!retailers.errors) {
    dispatch(setRetailers(retailers));
  }
  return retailers;
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
  const res = await fetch(`/api/retailers/${retailer_id}/ratings`, {
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

export const deleteRetailerRating
