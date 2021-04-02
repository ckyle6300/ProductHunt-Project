import { csrfFetch } from './csrf';

const SETPROFILE = 'profile/setUser';

//actions
export const setProfile = (profile) => {
  return {
    type: SETPROFILE,
    payload: profile
  }
}

//thunk
export const getProfiles = (num) => async dispatch => {
  const response = await csrfFetch(`/api/profile/${num}`);
  if (!response.ok) {
    throw response;
  }
  const profile = await response.json();

  dispatch(setProfile(profile));
}

//reducer
const initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETPROFILE:
      const newObj = {};
      newObj[action.payload.id] = action.payload
      return newObj;
    default:
      return state;
  }
}

export default profileReducer;