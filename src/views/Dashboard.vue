<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Welcome back {{userProfile.firstName}}</h1>
          <Strava />
      </div>
    </div>
    <div class="row">
        <div class="col-7">
          <div class="start-workout-widget">
            <h3>Keep up your fitness goals.</h3>
            <button @click="startWorkout()">Start workout</button>
          </div>
        </div>
    </div>
    <div class="modal" v-show="selectWorkout">
            <div class="modal-inner">
                <div class="header">
                  <h4>Select a workout</h4>
                  <a @click="selectWorkout = false">Cancel</a>
                </div>
                <div v-for="(workout, idx) in workouts" :key="idx" class="list-item" @click="goToWorkout(workout)">
                    <h5>{{workout.name}}</h5>
                </div>
                <p>or</p>
                <button @click="startNewWorkout()">Start a new workout</button>
            </div>
        </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Strava from '@/components/Strava.vue'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Home',
  data() {
    return {
      showCreateWorkout: false,
      selectWorkout: false,
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
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      
      let date = val.toDate()
      return moment(date).calendar(); 
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
    // this.$store.dispatch('getLoggedWorkouts');
  },
  methods: {
    startNewWorkout(){
      this.$router.push({name:'LogWorkout'});
    },
    startWorkout(workout){
      // select workout
      if (!workout){
        console.log("select yoru workout");
        this.selectWorkout = true;
      } else {
        this.$router.push({name:'Workout',params:{workoutId:workout.id, workout}});
      }

      // go to active workout page
    },
    goToWorkout(workout){
      this.$router.push({name:'Workout',params:{workoutId:workout.id, workout}});
    },
    addExercise(){
      const newExercise = {
        name: this.exercise.name,
        reps: this.exercise.reps,
        sets: this.exercise.sets,
        rest: this.exercise.rest
      }
      this.workout.exercises.push(newExercise);
    },
    createWorkout(){
      this.$store.dispatch('createWorkout', { 
        name: this.workout.name,
        exercises: this.workout.exercises,
      })
      this.workout.name = '';
      this.workout.exercises = [];
    },
    deleteWorkout(workout){
      this.$store.dispatch('deleteLoggedWorkout', { 
        id: workout.id
      })
    }
  }
}
</script>

<style lang="scss">
.start-workout-widget{
  padding: 1.5rem;
  background: $elBackground;
  border-radius: 0.5rem;
  button{
    margin-top: 1.5rem;
  }
}
.my-workouts{
  h2{
    margin-bottom: 1.5rem;
  }
}

.workout{
  cursor: pointer;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba($color: #fff, $alpha: .1);
  .title{
    display: flex;
    justify-content: space-between;
  }
  .description{
    font-size: 14px;
    opacity: 0.6;
  }
}
</style>