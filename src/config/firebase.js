import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAugP_V1ezj9DFC0dDqUphN2JJAznGrnow",
  authDomain: "mizuyari-91fa6.firebaseapp.com",
  databaseURL: "https://mizuyari-91fa6.firebaseio.com",
  projectId: "mizuyari-91fa6",
  storageBucket: "mizuyari-91fa6.appspot.com",
  messagingSenderId: "691507603862"
}

firebase.initializeApp(config)

export const db = firebase.database()
export const dbRef = db.ref()
export const storage = firebase.app().storage('gs://mizuyari-91fa6.appspot.com')
export const storageRef = storage.ref()
export const firebaseAuth = firebase.auth
