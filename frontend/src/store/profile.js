import { csrfFetch } from './csrf';

const SETPROFILE = 'profile/setUser';
const GETALLPROFILE = 'profile/getall';

//actions
export const setProfile = (profile) => {
  return {
    type: SETPROFILE,
    payload: profile
  }
}

export const getThem = (profiles) => {
  return {
    type: GETALLPROFILE,
    payload: profiles
  }
}

//thunk
export const getAllOfThemP = () => async dispatch => {

  const response = await csrfFetch('/api/profile/all');
  const result = await response.json();

  dispatch(getThem(result));
}

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
    case GETALLPROFILE:
      let allofProfiles = {};
      for (const key in action.payload) {

        allofProfiles[Number(action.payload[key].id)] = action.payload[key]
      }
      return allofProfiles;
    case SETPROFILE:
      const newObj = {};
      newObj[action.payload.id] = action.payload
      return newObj;
    default:
      return state;
  }
}

export default profileReducer;