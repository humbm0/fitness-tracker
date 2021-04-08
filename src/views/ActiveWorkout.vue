<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Back to {{workout.name}} workout</a></div>
                <div class="float-right"></div>
            </div>
            <div class="row">
              <div class="col-12">
                <div v-for="(exercise, idx) in exercises" :key="idx" class="exercise" :class="{'active': idx === currentExercise}">
                  <div >
                    <p>Exercise {{idx + 1}} of {{exercises.length}}</p>
                      <div class="list-item-name">
                        <h2>{{exercise.name}}</h2>
                      </div>
                      <div v-for="(set, idx) in exercise.sets" :key="idx" class="set" :class="{'active': idx === currentSet}">
                        <p>Set {{idx + 1}}</p>
                        <ion-icon name="checkmark-circle-outline" v-if="set.complete" class="medium"></ion-icon>
                        <div>
                          <div v-if="set.timeOn"><span>{{set.timeOn}}</span> seconds</div>
                          <div v-if="set.reps"><span>{{set.reps}}</span> reps</div>
                          <div v-if="set.weight">*</div>
                          <div v-if="set.weight"><span>{{set.weight}}</span>kg</div>
                        </div>
                        <button v-if="idx === currentSet" :class="{'active': idx === currentSet}" @click="finishSet(set, exercise)">Finish set</button>
                      </div>
                  </div>
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
      exercises: this.$route.params.workoutExercises,
      currentExercise: 0,
      currentSet: 0,
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
    finishSet(set, exercise){
      if (this.currentSet < exercise.sets.length - 1) {
        this.currentSet ++;
        set.complete = true;
      } else  if (this.currentExercise < this.exercises.length - 1){
        set.complete = true;
        console.log("next exercise");
        this.currentSet = 0;
        this.currentExercise ++;
      } else {
        console.log("workout complete");
      }
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
.exercise{
  margin-bottom: 1.5rem;
  button{
    display: none;
  }
  &.active{
    .set{
      &.active{
        height: 25rem;
        flex-direction: column;
        justify-content: space-around;
        button{
          display: block;
        }
      }
    }
  }
}
</style>