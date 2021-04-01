<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <router-link to="/workouts">Back to workouts</router-link>
                <div class="float-right"><a @click="editExercises = !editExercises">{{ editExercises ? 'Done' : 'Edit' }}</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>{{workout.name}}</h1>
                <p>{{workoutExercises.length}} exercises</p>

                <div>
                  <div v-for="(exercise, idx) in workoutExercises" :key="idx" class="list-item">
                      <p>{{idx + 1}} of {{workoutExercises.length}}</p>
                      <h5>{{exercise.name}}</h5>
                      <div v-for="(set, idx) in exercise.sets" :key="idx" class="set">
                        <p>Set {{idx + 1}}</p>
                        <p>{{set.reps}} reps<span v-if="set.weight"> * {{set.weight}}kg</span></p>
                        <p v-if="set.timeOn">{{set.timeOn}} seconds</p>
                      </div>
                      <button @click="addSet(exercise)" v-if="editExercises || exercise.sets.length == 0">Add set</button>
                  </div>
                  <!-- <button @click="startWorkout(workout)">Start workout</button>
                  <button @click="saveWorkout(workout)">Save workout</button> -->
                </div>

                <div>
                  <p v-if="workoutExercises.length == 0">This workout has no exercises...</p>
                  <button @click="addExercises(workout)">Add exercises</button>
                </div>

                <div class="createExercise modal" v-show="showAddSet">
                    <div class="modal-inner">
                        <div class="header">
                          <h4>Add set</h4>
                          <a @click="showAddSet = false">Close</a>
                        </div>
                        <form @submit.prevent>
                            <input v-model="set.reps" type="number" placeholder="Reps"/>
                            <input v-model="set.weight" type="number" placeholder="Weight"/><span>kg</span>
                            <button @click="addSet(exercise)">Add set</button>
                        </form>
                    </div>
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
      editExercises: false,
      showAddSet: false,
      exercise: {},
      set: {
        reps: '',
        weight: '',
        timeOn: ''
      }
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
    addSet(exercise){

      if (exercise.sets.length == 0) {
        if (this.showAddSet == false) {
          this.showAddSet = true
          this.exercise = exercise;
        } else {
          console.log("does not have sets");
          const newSet = this.set;
          console.log(exercise);
          exercise.sets.push(newSet); 
          this.$store.dispatch('addSet', exercise);
          this.showAddSet = false
          this.exercise = {};
        }
      } else {
        console.log("has sets");
        const newSet = exercise.sets[exercise.sets.length - 1];
        exercise.sets.push(newSet); 
        this.$store.dispatch('addSet', exercise);
      }
    },
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
.set{
  padding: 1rem;
  background: $elBackground;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}
</style>