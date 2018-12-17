import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_USER:
      return { ...state, authenticated: payload, errorMessage: '' };
    case AUTH_ERROR:
      return { ...state, authenticated: '', errorMessage: payload };
    default:
      return state;
  }
};
