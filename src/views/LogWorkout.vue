<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Cancel</a></div>
                <div class="float-right"></div>
            </div>
            <div class="row">
              <div class="col-12">
                <div>
                  <input v-model="searchExercise" type="text" placeholder="Search exercise"/>
                </div>
                <div v-if="searchExercise">
                    <p v-for="(exercise, idx) in filteredExercises" :key="idx" @click="goToExercise(exercise)">{{exercise.name}}</p>
                    <p>Create "{{searchExercise}}"</p>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LogWorkout',
  data() {
    return {
      searchExercise: '',
      currentExercise: 0,
      currentSet: 0,
      workoutStatus: ''
    }
  },
  components: {
  },
  computed: {
    ...mapState(['userProfile', 'exercises']),
    filteredExercises:function(){
        var self=this;
        return this.exercises.filter(function(exercise){return exercise.name.toLowerCase().indexOf(self.searchExercise.toLowerCase())>=0;});
    }
  },
  mounted(){
    this.$store.dispatch('getExercises');
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