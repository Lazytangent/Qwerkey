import { SET_SEARCH } from './constants';
import { setSearch } from './actions';
import api from './api';

export const getQuery =
  (queryString, type, field, state, city) => async (dispatch) => {
    const res = await api(
      `/api/search?query=${queryString}${type ? `&type=${type}` : ''}${
        field ? `&field=${field}` : ''
      }${city ? `&city=${city}` : ''}${state ? `&state=${state}` : ''}`
    );
    const data = await res.json();
    const searchData = {};

    searchData.posts = data.posts || [];
    searchData.comments = data.comments || [];
    searchData.retailers = data.retailers || [];

    dispatch(setSearch(searchData));
    return data;
  };

const initialState = {
  posts: [],
  comments: [],
  retailers: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        posts: action.posts.map((post) => post.id),
        comments: action.comments.map((comment) => comment.id),
        retailers: action.retailers.map((retailer) => retailer.id),
      };
    default:
      return state;
  }
};

export default searchReducer;
