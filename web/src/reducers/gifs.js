import { REQUEST_GIFS, FETCH_FAVOURITED_GIFS } from '../actions'

const initialState = {
  data: [],
  favourites: []
}

// note that the state here refers to just the state this reducer is responsible for
export default function gifs (state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data // this passes the old state with an updated property
      }
    case FETCH_FAVOURITED_GIFS:
      const arr = []
      for (const i in action.payload) {
        if (action.payload.hasOwnProperty(i)) {
          arr.push(action.payload[i])
        }
      }
      return {
        ...state, favourites: arr
      }
    default:
      return state
  }
}
