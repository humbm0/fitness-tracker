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
                          <div v-if="set.timeOn"><span>{{set.timeOn}}</span> seconds</div>
                          <div v-if="set.reps"><span>{{set.reps}}</span> reps</div>
                          <div>*</div>
                          <div v-if="set.weight"><span>{{set.weight}}</span>kg</div>
                        <ion-icon name="close-outline" class="medium" @click="deleteSet(exercise, idx)" v-if="editExercises"></ion-icon>
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
                            <div class="radio-buttons">
                              <div class="radio-button">
                                <input type="radio" id="reps" value="reps" v-model="set.type">
                                <label for="reps">Reps</label>
                              </div>
                              <div class="radio-button">
                                <input type="radio" id="time" value="time" v-model="set.type">
                                <label for="time">Time</label>
                              </div>
                            </div>
                            <input v-if="set.type == 'reps'" v-model="set.reps" type="number" placeholder="Reps"/>
                            <div class="input" v-if="set.type == 'time'">
                              <input v-model="set.time" type="number" placeholder="Time on"/><span class="suffix">seconds</span>
                            </div>
                            <div class="input" v-if="set.type">
                              <input v-model="set.weight" type="number" placeholder="Weight"/><span class="suffix">kg</span>
                            </div>
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
        type: '',
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
    deleteSet(exercise, idx){
      console.log(exercise);
      console.log(idx);
      exercise.sets.splice(idx, 1)
      console.log(exercise.sets);
      this.$store.dispatch('addSet', exercise);
    },
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
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 80px;
  *{
    align-self: center;
  }
  span{
    font-size: 28px;
  }
}
</style>