<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{workout.name}}</h1>
                <p>{{workout.exercises.length}} exercises</p>
                
                <div class="exercises">
                  <div class="col-3 workout-card" v-for="(exercise, idx) in workout.exercises" :key="idx">
                    <p>Exercise {{idx + 1}}</p>
                    <h4>{{exercise.name}}</h4>
                    <p>{{exercise.reps}} reps</p>
                    <p>{{exercise.sets}} sets</p>
                    <p>{{exercise.rest}} rest</p>
                  </div>
                </div>
                <button @click="startWorkout(workout)">Start workout</button>
                <button @click="saveWorkout(workout)">Save workout</button>
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
      workout: this.$route.params.workout,
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
    startWorkout(workout){
      this.$router.push({name:'ActiveWorkout',params:{workoutId:workout.id, workout}});
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