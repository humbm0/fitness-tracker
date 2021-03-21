<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{workout.name}}</h1>
                <p>{{workout.exercises.length}} exercises</p>
                <div v-for="(exercise, idx) in workout.exercises" :key="idx">
                    <h4>Exercise {{idx + 1}}</h4>
                    <p>{{exercise.name}}</p>
                    <p>{{exercise.reps}}</p>
                    <p>{{exercise.sets}}</p>
                    <p>{{exercise.rest}}</p>
                </div>

                <button @click="saveWorkout(workout)">Save workout</button>
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
    saveWorkout(workout){
        this.$store.dispatch('saveWorkout', { 
            name: workout.name,
            exercises: workout.exercises,
        })
    }
  }
}
</script>