import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (body, cb) => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:3090/signup', body);
    dispatch({ type: AUTH_USER, payload: data.token });
    localStorage.setItem('token', data.token);
    cb();
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.response.data.error });
  }
};

export const signin = (body, cb) => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:3090/signin', body);
    dispatch({ type: AUTH_USER, payload: data.token });
    localStorage.setItem('token', data.token);
    cb();
  } catch (err) {
    console.dir(err);
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error || err.response.data
    });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  return { type: AUTH_USER, payload: '' };
};
