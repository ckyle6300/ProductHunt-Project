import { csrfFetch } from './csrf';

const GETCOMMENT = 'comment/set';
const ADDCOMMENT = 'comment/add';

//actions
export const setComments = (comments) => {
  return {
    type: GETCOMMENT,
    payload: comments,
  }
}

export const addPost = (comment) => {
  return {
    type: ADDCOMMENT,
    payload: comment
  }
}

//thunks
export const getComments = (num) => async dispatch => {

  const response = await csrfFetch(`/api/splash/comment/${num}`);
  if (!response.ok) {
    throw response;
  }
  const comments = await response.json();

  dispatch(setComments(comments));
}

export const createComment = (info) => async dispatch => {
  const { comment, userId, productId } = info

  const response = await csrfFetch('/api/splash/comment', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment,
      userId,
      productId
    })
  })
  if (!response.ok) {
    throw response;
  }
  const newComment = await response.json();

  dispatch(addPost(newComment));
}

export const deleteComment = (info) => async dispatch => {
  const { comId, prodId } = info

  const response = await csrfFetch('/api/splash/comment', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comId,
      prodId,
    })
  })

  const newComments = await response.json();

  dispatch(setComments(newComments))
}


//reducer
const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETCOMMENT:
      let newObj = {};
      action.payload.forEach((element, idx) => {
        newObj[element.id] = element
      });
      return newObj
    case ADDCOMMENT:
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    default:
      return state;
  }
}

export default commentReducer;