import csrfFetch from "./csrf.js";
import { CREATE_FAVORITE, DELETE_FAVORITE } from "./favoritesActions.js";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    case CREATE_FAVORITE:
      console.log(action, "this is my action")
     // newState.user.favorites.push(action.payload);
      return {
        ...state, 
        user: {
            ...state.user, 
            favorites: [...state.user.favorites, action.payload]
        }
      }
      //return newState;
    case DELETE_FAVORITE:
      console.log(newState, "before delete")
      newState.user.favorites.forEach((favorite, idx)=> {
        if (favorite.id === action.payload){
          delete newState.user.favorites[idx]
        }
      })
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
