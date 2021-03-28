import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    workouts: [],
    exercises: [],
    loggedWorkouts: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setWorkouts(state, val) {
      state.workouts = val
    }, 
    setExercises(state, val) {
      state.exercises = val
    }, 
    setLoggedWorkouts(state, val) {
      state.loggedWorkouts = val
    } 
  },
  actions: {

    async saveWorkout({ state }, workout) {
      await fb.loggedWorkoutsCollection.add({
        createdOn: new Date(),
        name: workout.name,
        exercises: workout.exercises,
        user: {
          userId: fb.auth.currentUser.uid,
          firstname: state.userProfile.firstName,
          lastName: state.userProfile.lastName
        }
      })
      router.push('/')
    },

    async getLoggedExercises({ commit }){
      const userId = fb.auth.currentUser.uid
      if (userId) {
        fb.loggedExercisesCollection.where("userId", "==", userId).orderBy("createdOn", "desc").onSnapshot(function(querySnapshot) {
          let workoutsArray = [];
          querySnapshot.forEach(function(doc) {
            let workout = doc.data();
            workout.id = doc.id;
            workoutsArray.push(workout);            
          });
          commit('setLoggedWorkouts', workoutsArray);
        });
      }
    },

    async deleteLoggedWorkout({ state }, workout) {
      await fb.loggedWorkoutsCollection.doc(workout.id).delete();
      return state
    },

    async getLoggedWorkouts({ commit }){
      const userId = fb.auth.currentUser.uid
      if (userId) {
        fb.loggedWorkoutsCollection.where("userId", "==", userId).orderBy("createdOn", "desc").onSnapshot(function(querySnapshot) {
          let workoutsArray = [];
          querySnapshot.forEach(function(doc) {
            let workout = doc.data();
            workout.id = doc.id;
            workoutsArray.push(workout);            
          });
          commit('setLoggedWorkouts', workoutsArray);
        });
      }
    },

    async getWorkouts({ commit }){
      const userId = fb.auth.currentUser.uid
      if (userId) {
        fb.workoutsCollection.where("userId", "==", userId).onSnapshot(function(querySnapshot) {
          let workoutsArray = [];
          querySnapshot.forEach(function(doc) {
            let workout = doc.data();
            workout.id = doc.id;
            workoutsArray.push(workout);            
          });
          commit('setWorkouts', workoutsArray);
        });
      }
    },

    async createWorkout({ state }, workout) {
      await fb.workoutsCollection.add({
        createdOn: new Date(),
        name: workout.name,
        exercises: workout.exercises,
        user: {
          userId: fb.auth.currentUser.uid,
          firstname: state.userProfile.firstName,
          lastName: state.userProfile.lastName
        }
      })
    },

    async getExercises({ commit }){
      const userId = fb.auth.currentUser.uid
      if (userId) {
        fb.exercisesCollection.where("userId", "==", userId).onSnapshot(function(querySnapshot) {
          let exerciseArray = [];
          querySnapshot.forEach(function(doc) {
            let exercise = doc.data();
            exercise.id = doc.id;
            exerciseArray.push(exercise);            
          });
          commit('setExercises', exerciseArray);
        });
      }
    },

    async createExercise({ state }, exercise) {
      await fb.exercisesCollection.add({
        createdOn: new Date(),
        name: exercise.name,
        description: exercise.description,
        userId: fb.auth.currentUser.uid
      })
      return state
    },

    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        firstName: form.firstName,
        lastName: form.lastName
      })
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

    async logout({ commit }) {
      await fb.auth.signOut()
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      // set user profile in state
      commit('setUserProfile', userProfile.data())
      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    }
  },
  modules: {
  }
})
