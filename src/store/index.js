import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    workouts: [],
    workout:{},
    exercises: [],
    exercise: {},
    workoutExercises: [],
    loggedWorkouts: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setWorkouts(state, val) {
      state.workouts = val
    }, 
    setWorkout(state, val) {      
      state.workout = val;
    }, 
    setWorkoutExercises(state, val){
      state.workoutExercises = val;
      console.log(state.workoutExercises);
    },
    setExercises(state, val) {
      state.exercises = val
    }, 
    setExercise(state, val) {
      state.exercise = val
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

    async getWorkoutExercises({commit}, workout){
      fb.workoutExercisesCollection.where("workoutId", "==", workout.id).onSnapshot(function(querySnapshot) {
        let exerciseArray = [];
          querySnapshot.forEach(function(doc) {
            let exercise = doc.data();
            exercise.id = doc.id;
            exerciseArray.push(exercise);      
          });
          commit('setWorkoutExercises', exerciseArray);
      })
    },

    async getWorkout({ dispatch, commit }, workout){
      const userId = fb.auth.currentUser.uid
      if (userId) {
        fb.workoutsCollection.doc(workout.id).get().then((doc) => {
            if (doc.exists) {
                let workout = doc.data()
                workout.id = doc.id;
                dispatch('getWorkoutExercises', workout);
                commit('setWorkout', workout);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      }
    },

    async addExercisesToWorkout({ state }, workout) {
      workout.selectedExercises.forEach(exercise => {
        fb.workoutExercisesCollection.doc(exercise.id).set({
          name: exercise.name, 
          description: exercise.description, 
          exerciseId: exercise.id,
          workoutId: workout.id,
          userId: fb.auth.currentUser.uid,
          sets: []
        }).then(function(doc) {
          console.log("exercises added to workout");
          return doc
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      });
      router.push({name:'Workout',params:{workoutId:workout.id}});
      return state
    },

    async createWorkout({ state }, workout) {
      await fb.workoutsCollection.add({
        createdOn: new Date(),
        name: workout.name, 
        exercises: '',
        userId: fb.auth.currentUser.uid
      }).then(function(doc) {
        router.push({name:'Workout',params:{workoutId:doc.id}});
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

      return state
     
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

    async addSet({ dispatch }, exercise) {
      await fb.workoutExercisesCollection.doc(exercise.id).update({
        sets: exercise.sets
      })
      .then(() => {
        console.log("set added");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

      return dispatch
    },

    async updateExercise({ dispatch }, exercise) {
      await fb.exercisesCollection.doc(exercise.id).update({
        name: exercise.name,
        description: exercise.description
      })
      .then(() => {
        console.log("exercise updated in library");
        // update exercise names in workouts
        fb.workoutExercisesCollection.doc(exercise.id).update({
          name: exercise.name,
          description: exercise.description
        })
        .then(() => {
          console.log("exercise updated in workouts");
          // update exercise names in workouts
          
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

      return dispatch
    },

    async getExercise({ commit }, exercise){
      const userId = fb.auth.currentUser.uid
      if (userId) {
        fb.exercisesCollection.doc(exercise.id).get().then((doc) => {
            if (doc.exists) {
                let exercise = doc.data()
                exercise.id = doc.id;
                commit('setExercise', exercise);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
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
        router.push('/dashboard')
      }
    }
  },
  modules: {
  }
})
