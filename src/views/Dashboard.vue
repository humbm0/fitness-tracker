<template>
  <div class="home">
    <h1>Hi {{userProfile.firstName}}, welcome back</h1>
    <Strava />
    <form @submit.prevent>
      <h2>My Workouts</h2>
      <div v-for="(workout, idx) in workouts" :key="idx">
        <p>{{workout.name}}</p> <span>{{workout.exercises.length}} exercises</span>
      </div>
      <h2>Create workout</h2>
      <button @click="saveWorkout">Save workout</button>
      <div>
        <label for="workoutName">Name</label>
        <input v-model="workout.name" type="text" id="workoutName" />
      </div>
      <h3>Exercises</h3>
      <div v-for="(exercise, idx) in workout.exercises" :key="idx">
        <p>{{exercise.name}}</p>
        <p>{{exercise.reps}}</p>
        <p>{{exercise.sets}}</p>
        <p>{{exercise.rest}}</p>
      </div>

      <div>
        <label for="exerciseName">Name</label>
        <input v-model="exercise.name" type="text" id="exerciseName" />
      </div>
      <div>
        <label for="exerciseReps">Reps</label>
        <input v-model="exercise.reps" type="text" id="exerciseReps" />
      </div>
      <div>
        <label for="exerciseSets">Sets</label>
        <input v-model="exercise.sets" type="text" id="exerciseSets" />
      </div>
      <div>
        <label for="exerciseRest">Rest</label>
        <input v-model="exercise.rest" type="text" id="exerciseRests" />
      </div>
      <button @click="addExercise">Add exercise</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Strava from '@/components/Strava.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      workout: {
        name: "",
        exercises: []
      },
      exercise: {
        name: '',
        reps: '',
        sets: '',
        rest: ''
      }
    }
  },
  components: {
    Strava
  },
  computed: {
    ...mapState(['userProfile', 'workouts']),
  },
  mounted(){
    this.$store.dispatch('getWorkouts');
  },
  methods: {
    addExercise(){
      const newExercise = {
        name: this.exercise.name,
        reps: this.exercise.reps,
        sets: this.exercise.sets,
        rest: this.exercise.rest
      }
      this.workout.exercises.push(newExercise);
    },
    saveWorkout(){
      this.$store.dispatch('createWorkout', { 
        name: this.workout.name,
        exercises: this.workout.exercises,
      })
      this.workout.name = '';
      this.workout.exercises = [];
    }
  }
}
</script>
