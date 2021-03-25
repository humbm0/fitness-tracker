<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{workout.name}}</h1>

                <div class="exercises">
                  <div class="workout-card" v-for="(exercise, idx) in workout.exercises" :key="idx" v-show="idx == currentExercise">
                    <p>Exercise {{idx + 1}}</p>
                    <h4>{{exercise.name}}</h4>
                    <p>{{exercise.reps}} reps</p>
                    <p>{{exercise.sets}} sets</p>
                    <p>{{exercise.rest}} rest</p>
                  </div>
                </div>

                <button @click="nextExercise()">Exercise complete</button>
                <button @click="skipExercise()">Skip exercise</button>

                <div class="modal" v-if="workoutStatus == 'complete'">
                  <div class="modal-inner">
                    <div class="header">
                      <h3>Well done! You completed the workout</h3>
                    </div>
                    <button @click="saveWorkout(workout)">Save your workout</button>
                  </div>
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
    console.log(this.workout.exercises);
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