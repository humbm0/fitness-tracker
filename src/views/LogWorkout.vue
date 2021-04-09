<template>
    <div class="container">

        <div class="row" v-if="!activeExercise">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Cancel</a></div>
                <div class="float-right">Finish exercise</div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="dropdown">
                  <label for="">New exercise</label>
                  <input v-model="searchExercise" type="text" placeholder="Search exercise"/>
                  <div v-if="searchExercise" class="list">
                      <li v-for="(exercise, idx) in filteredExercises" :key="idx" @click="startExercise(exercise)">{{exercise.name}}</li>
                      <li>Create "{{searchExercise}}"</li>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div class="active-exercise" v-if="activeExercise">
          <div class="header-nav-bar">
              <div><a @click="activeExercise = ''">Cancel exercise</a></div>
              <!-- <div class="float-right">Finish exercise</div> -->
          </div>
          <div class="row">
            <div class="col-12">
              <h2>{{activeExercise.name}}</h2>
              
              <div class="set">
                <p>Set 1</p>
                <div>
                  <div><span>10</span> reps</div>
                  <div>*</div>
                  <div><span>50</span>kg</div>
                </div>
                <button @click="finishSet()">Finish set</button>
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
      workoutStatus: '',
      activeExercise: ''
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
    startExercise(exercise){
      console.log(exercise);
      this.activeExercise = exercise;
    },
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
.dropdown{
  position: relative;
  .list{
    background: $elBackground;
    border-radius: 1rem;
    padding: .5rem;
    position: absolute;
    right: 0;
    left: 0;
    top: 5rem;
    li{
      list-style: none;
      padding: 0.5rem;
      margin-bottom: .5rem;
      &:last-child{
        margin-bottom: 0;
        background: rgba($color: #fff, $alpha: 0.1);
        border-radius: 0.5rem;
      }
    }
  }
}
</style>