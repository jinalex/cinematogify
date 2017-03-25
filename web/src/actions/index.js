import request from 'superagent'
import { browserHistory } from 'react-router'
import Firebase from 'firebase'
import mainStore from 'stores/MainStore'

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
  request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
    mainStore.data = response
  })
}

export function favouriteGif ({ selectedGif }) {
  const userUid = Firebase.auth().currentUser.uid
  const gifId = selectedGif.id

  return Firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  })
}

export function unfavouriteGif ({ selectedGif }) {
  const userUid = Firebase.auth().currentUser.uid
  const gifId = selectedGif.id

  return Firebase.database().ref(userUid).child(gifId).remove()
}

export function fetchFavouritedGifs () {
  let userUid = null
  for (const key in window.localStorage) {
    if (key.includes('firebase:authUser:')) {
      userUid = JSON.parse(window.localStorage.getItem(key)).uid
    }
  }
  return () => {
    Firebase.database().ref(userUid).on('value', snapshot => {
      const arr = []
      const snapshotVal = snapshot.val()
      for (const i in snapshotVal) {
        if (snapshotVal.hasOwnProperty(i)) {
          arr.push(snapshotVal[i])
        }
      }
      mainStore.favourites = arr
    })
  }
}

export function openModal (gif) {
  mainStore.modalIsOpen = true
  mainStore.selectedGif = gif.selectedGif
  return gif
}

export function closeModal () {
  mainStore.modalIsOpen = false
  mainStore.selectedGif = null
}

export function signUpUser (credentials) {
  return () => {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        authUser()
        browserHistory.push('/favourites')
      })
      .catch(error => {
        authError(error)
      })
  }
}

export function signInUser (credentials) {
  return () => {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        authUser()
        browserHistory.push('/favourites')
      })
      .catch(error => {
        authError(error)
      })
  }
}

export function signOutUser () {
  Firebase.auth().signOut()
  browserHistory.push('/')
  mainStore.authenticated = false
  mainStore.error = null
}

export function verifyAuth () {
  return () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authUser()
      } else {
        signOutUser()
      }
    })
  }
}

export function authUser () {
  mainStore.authenticated = true
  mainStore.error = null
}

export function authError (error) {
  mainStore.error = error.message
}
