import { REQUEST_GIFS } from '../actions'

const initialState = {
  data: []
}

// note that the state here refers to just the state this reducer is responsible for
export default function gifs (state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data // this passes the old state with an updated property
      }
    default:
      return state
  }
}
