<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Back</a></div>
                <div class="float-right"><a @click="showCreateExercise = true">Edit</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>{{workout.name}}</h1>
                <p>{{workoutExercises.length}} exercises</p>
                
                <div>
                  <div v-for="(exercise, idx) in workout.exercises" :key="idx" class="list-item">
                      <p>Exercise {{idx + 1}}</p>
                      <h5>{{exercise.name}}</h5>
                      <p v-if="exercise.reps">{{exercise.reps}} reps</p>
                      <p v-if="exercise.time">{{exercise.timeOn}} seconds on</p>
                      <p v-if="exercise.sets">{{exercise.sets}} sets</p>
                      <p v-if="exercise.rest">{{exercise.rest}} seconds rest</p>

                      <!-- <p v-if="exercise.workouts">{{exercise.workouts[0].reps}} reps</p> -->
                  </div>
                  <!-- <button @click="startWorkout(workout)">Start workout</button>
                  <button @click="saveWorkout(workout)">Save workout</button> -->
                </div>

                <div>
                  <p v-if="workoutExercises.length < 0">This workout has no exercises...</p>
                  <button @click="addExercises(workout)">Add exercises</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Workout',
  data() {
    return {
      
    }
  },
  components: {
  },
  computed: {
    ...mapState(['userProfile', 'workout', 'workoutExercises']),
  },
  mounted(){
    this.$store.dispatch('getWorkout', { 
        id: this.$route.params.workoutId
    });    
  },
  methods: {
    
    startWorkout(workout){
      this.$router.push({name:'ActiveWorkout',params:{workoutId:workout.id, workout}});
    },
    addExercises(workout){
      this.$router.push({name:'AddExercises',params:{workoutId:workout.id, workout}});
    }
  }
}
</script>

<style lang="scss" scoped>
.exercises{
  display: flex;
}
.workout-card{
  background: $elBackground;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  p, h4{
    margin-bottom: 0.5rem;
  }
}
</style>