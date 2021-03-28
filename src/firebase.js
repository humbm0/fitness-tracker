import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCRceIFYUm1pGYk71MuN4h8j5xuNPq2cBw",
    authDomain: "fitness-tracker-dbe0a.firebaseapp.com",
    projectId: "fitness-tracker-dbe0a",
    storageBucket: "fitness-tracker-dbe0a.appspot.com",
    messagingSenderId: "744938806104",
    appId: "1:744938806104:web:83accabd80a587d58ca32d",
    measurementId: "G-VN5NYSJ08F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const workoutsCollection = db.collection('workouts')
const exercisesCollection = db.collection('exercises')
const loggedWorkoutsCollection = db.collection('loggedWorkouts')
const loggedExercisesCollection = db.collection('loggedExercises')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  workoutsCollection,
  exercisesCollection,
  loggedWorkoutsCollection,
  loggedExercisesCollection
}