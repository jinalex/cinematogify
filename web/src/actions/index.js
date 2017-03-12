import request from 'superagent'
import { browserHistory } from 'react-router'
import Firebase from 'firebase'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const REQUEST_GIFS = 'REQUEST_GIFS'
export const FETCH_FAVOURITED_GIFS = 'FETCH_FAVOURITED_GIFS'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_USER = 'AUTH_USER'

const API_URL = 'http://api.giphy.com/v1/gifs/search?q='
const API_KEY = '&api_key=dc6zaTOxFJmzC'

const config = {
  apiKey: 'AIzaSyB616znrIQPAxh99PbQ5cDJbekpUepT_Mw',
  authDomain: 'cinematogify.firebaseapp.com',
  databaseURL: 'https://cinematogify.firebaseio.com',
  storageBucket: 'cinematogify.appspot.com',
  messagingSenderId: '965889439704'
}

Firebase.initializeApp(config)

export function requestGifs (term = null) {
  return (dispatch) => {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      })
    })
  }
}

export function favouriteGif ({ selectedGif }) {
  const userUid = Firebase.auth().currentUser.uid
  const gifId = selectedGif.id

  return dispatch => Firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  })
}

export function unfavouriteGif ({ selectedGif }) {
  const userUid = Firebase.auth().currentUser.uid
  const gifId = selectedGif.id

  return dispatch => Firebase.database().ref(userUid).child(gifId).remove()
}

export function fetchFavouritedGifs () {
  let userUid = null
  for (const key in window.localStorage) {
    if (key.includes('firebase:authUser:')) {
      userUid = JSON.parse(window.localStorage.getItem(key)).uid
    }
  }
  return (dispatch) => {
    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVOURITED_GIFS,
        payload: snapshot.val()
      })
    })
  }
}

export function openModal (gif) {
  return {
    type: OPEN_MODAL,
    gif
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}

export function signUpUser (credentials) {
  return (dispatch) => {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser())
        browserHistory.push('/favourites')
      })
      .catch(error => {
        dispatch(authError(error))
      })
  }
}

export function signInUser (credentials) {
  return (dispatch) => {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser())
        browserHistory.push('/favourites')
      })
      .catch(error => {
        dispatch(authError(error))
      })
  }
}

export function signOutUser () {
  Firebase.auth().signOut()
  browserHistory.push('/')
  return {
    type: SIGN_OUT_USER
  }
}

export function verifyAuth () {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser())
      } else {
        dispatch(signOutUser())
      }
    })
  }
}

export function authUser () {
  return {
    type: AUTH_USER
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
