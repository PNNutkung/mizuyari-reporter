import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyAugP_V1ezj9DFC0dDqUphN2JJAznGrnow",
  authDomain: "mizuyari-91fa6.firebaseapp.com",
  databaseURL: "https://mizuyari-91fa6.firebaseio.com",
  projectId: "mizuyari-91fa6",
  storageBucket: "mizuyari-91fa6.appspot.com",
  messagingSenderId: "691507603862"
}
var Firebase = firebase.initializeApp(config)
export default Firebase
