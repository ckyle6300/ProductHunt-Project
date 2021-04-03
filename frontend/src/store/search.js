import { csrfFetch } from './csrf';

const GETDATA = 'search/data';

//actions
export const setMessage = (data) => {
  return {
    type: GETDATA,
    payload: data
  }
}

//thunk
export const getData = (data) => async dispatch => {
  dispatch(setMessage(data))
}

//reducer
const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETDATA:
      const newState = { ...state };
      newState['msg'] = action.payload;
      return newState;
    default:
      return state;
  }
}

export default searchReducer;