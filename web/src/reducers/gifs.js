import { REQUEST_GIFS_FULFILLED } from '../actions';

const initialState = {
  data: [],
};

 /* eslint-disable indent */
 // the switch statement is throwing eslint indent off

// note that the state here refers to just the state this reducer is responsible for
export default function gifs(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS_FULFILLED:
    // case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data, // this passes the old state with an updated property
      };
    default:
      return state;
  }
}
