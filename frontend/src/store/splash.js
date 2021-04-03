import { csrfFetch } from './csrf';

const GETPOSTS = 'splash/set';
const ADDPOST = 'splash/add';
const GETALL = 'splash/getall'

//actions
export const getAllPosts = (posts) => {
  return {
    type: GETALL,
    payload: posts
  }
}


export const setPosts = (posts) => {
  return {
    type: GETPOSTS,
    payload: posts,
  }
}

export const addPost = (post) => {
  return {
    type: ADDPOST,
    payload: post
  }
}

//thunks
export const getItAll = () => async dispatch => {
  const response = await csrfFetch('/api/splash/all');
  const result = await response.json();
  dispatch(getAllPosts(result));
}

export const getProducts = () => async dispatch => {
  const response = await csrfFetch('/api/splash');
  if (!response.ok) {
    throw response;
  }
  const posts = await response.json();

  dispatch(setPosts(posts));
}

export const createProduct = (post) => async dispatch => {
  const { description, image, productName, userId } = post
  const response = await csrfFetch('/api/splash', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productName,
      image,
      description,
      userId
    })
  })
  if (!response.ok) {
    throw response;
  }
  const newPost = await response.json();

  dispatch(addPost(newPost));
}

//reducer
const initialState = {};

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL:
      let allPostObj = {};
      for (const key in action.payload) {

        allPostObj[Number(action.payload[key].id)] = action.payload[key]
      }
      return allPostObj;
    case GETPOSTS:
      let newObj = {};
      for (const key in action.payload) {

        newObj[Number(action.payload[key].id)] = action.payload[key]
      }
      return newObj;
    case ADDPOST:
      const newState = { ...state };
      // const length = Object.keys(state).length;
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}

export default splashReducer;