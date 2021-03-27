<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Hi {{userProfile.firstName}}, welcome back</h1>
          <Strava />
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="start-workout-widget">
            <h3>Keep up your fitness goals.</h3>
            <button @click="startWorkout()">Start workout</button>

            <div class="modal" v-if="selectWorkout">
              <div class="modal-inner">
                <div class="header">
                  <h3>Select your workout</h3>
                  <a @click="selectWorkout = false">Close</a>
                </div>
                <div v-for="(workout, idx) in workouts" :key="idx">
                  <div @click="startWorkout(workout)">
                    <div class="workout">
                      <div class="title">
                        <h5>{{workout.name}}</h5> <span>{{workout.exercises.length}} exercises</span>
                      </div>
                      <span class="description" v-for="(exercise, idx) in workout.exercises" :key="idx">{{exercise.name}}, </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div>
            <h3>Completed workouts</h3>
            <div v-for="(workout, idx) in loggedWorkouts" :key="idx">
              <a @click="deleteWorkout(workout)">Delete</a>
              <div class="workout" @click="startWorkout(workout)">
                <div class="title">
                  <h5>{{workout.name}}</h5> <span>{{workout.exercises.length}} exercises</span>
                </div>
                <span>Completed {{workout.createdOn | formatDate}}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="col-4 float-right">
          <div class="my-workouts">
            <h2>My Workouts</h2>
            <div v-for="(workout, idx) in workouts" :key="idx">
              <div @click="goToWorkout(workout)">
                <div class="workout">
                  <div class="title">
                    <h5>{{workout.name}}</h5> <span>{{workout.exercises.length}} exercises</span>
                  </div>
                </div>
              </div>
            </div>
            <button @click="showCreateWorkout = !showCreateWorkout">Create new workout</button>
          </div>
        </div>

        <div class="modal" v-if="showCreateWorkout">
          <div class="modal-inner">
            <form @submit.prevent>
              <div class="header">
                  <h3>Create workout</h3>
                  <a @click="showCreateWorkout = false">Close</a>
                </div>
              <div>
                <input v-model="workout.name" type="text" id="workoutName" placeholder="Name"/>
              </div>
              <h5>Exercises</h5>
              <div v-for="(exercise, idx) in workout.exercises" :key="idx">
                <p>{{exercise.name}}</p>
                <p>{{exercise.reps}}</p>
                <p>{{exercise.sets}}</p>
                <p>{{exercise.rest}}</p>
              </div>

              <div>
                <input v-model="exercise.name" type="text" id="exerciseName" placeholder="Name"/>
              </div>
              <div>
                <input v-model="exercise.reps" type="text" id="exerciseReps" placeholder="Reps"/>
              </div>
              <div>
                <input v-model="exercise.sets" type="text" id="exerciseSets" placeholder="Sets"/>
              </div>
              <div>
                <input v-model="exercise.rest" type="text" id="exerciseRests" placeholder="Rest"/>
              </div>

              <button class="secondary" @click="addExercise">Add exercise</button>

              <button @click="createWorkout">Save workout</button>

            </form>
          </div>
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
    ...mapState(['userProfile', 'workouts', 'loggedWorkouts']),
  },
  mounted(){
    this.$store.dispatch('getWorkouts');
    this.$store.dispatch('getLoggedWorkouts');
  },
  methods: {
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

.modal{
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($color: $background, $alpha: 0.8);
  .modal-inner{
    width: 520px;
    background: #282828;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: $shadow;
    .header{
      display: flex;
      justify-content: space-between;
      margin-bottom: 2.5rem;
    }
  }
}
</style>