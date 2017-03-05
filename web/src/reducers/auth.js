import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions';

const initialState =  {
  authenticated: false,
};

 /* eslint-disable indent */
 // the switch statement is throwing eslint indent off

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state, authenticated: true,
      };
    case SIGN_OUT_USER:
      return {
        ...state, authenticated: false,
      };
    default:
      return state;
  }
}
