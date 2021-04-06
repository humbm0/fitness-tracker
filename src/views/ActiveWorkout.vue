<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Back to {{workout.name}} workout</a></div>
                <div class="float-right"></div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>{{workoutExercises.length}}</p>
                <h1>{{workout.name}}</h1>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ActiveWorkout',
  data() {
    return {
      workout: this.$route.params.workout,
      currentExercise: 0,
      workoutStatus: ''
    }
  },
  components: {
  },
  computed: {
    ...mapState(['userProfile', 'workouts']),
  },
  mounted(){
    
  },
  methods: {
    async saveWorkout(workout){
        this.$store.dispatch('saveWorkout', { 
            name: workout.name,
            exercises: workout.exercises,
        })
  
    },
    nextExercise(){
      if(this.currentExercise + 1 < this.workout.exercises.length){
        this.currentExercise = this.currentExercise + 1;
        console.log(this.currentExercise);
      }else{
        console.log("workout finished");
        this.workoutStatus = 'complete';
      }
    },
    skipExercise(idx){
      if(this.currentExercise + 1 < this.workout.exercises.length){
        this.workout.exercises.splice(idx, 1)
        console.log(this.workout.exercises);
      }else{
        console.log("workout finished");
        this.workoutStatus = 'complete';
      }
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