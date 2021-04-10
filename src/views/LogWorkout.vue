<template>
    <div class="container">

        <div class="row" v-if="!activeExercise">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Cancel</a></div>
                <div class="float-right">Finish workout</div>
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
            <div class="row" v-if="workout.exercises.length > 0">
              <div class="col-12">
                <h4>{{workout.exercises.length}} completed exercises</h4>
                <div class="list" v-for="(exercise, idx) in workout.exercises.slice().reverse()" :key="idx">
                  {{exercise.name}}
                  <li v-for="(set, idx) in exercise.sets" :key="idx">
                    <p>Set {{set.setNumber}} | {{set.reps}} reps of {{set.weight}}kg</p>
                  </li>
                </div>
              </div>
            </div>
        </div>

        <div class="active-exercise" v-if="activeExercise">
          <div class="header-nav-bar">
              <div><a @click="activeExercise = ''">Cancel exercise</a></div>
              <div class="float-right" @click="finishExercise()">Finish exercise</div>
          </div>
          <div class="row">
            <div class="col-12">
              <h2>{{activeExercise.name}}</h2>
              
              <div class="set active">
                <p v-if="savedSets">Set {{savedSets.length + 1}}</p>
                <p v-if="!savedSets">Set 1</p>
                <div class="reps">
                  <ion-icon name="remove-outline" class="medium" @click="removeRep()"></ion-icon>
                  <div><span>{{activeSet.reps}}</span> reps</div>
                  <ion-icon name="add-outline" class="medium" @click="addRep()"></ion-icon>
                </div>
                <div class="input">
                  <input v-model="activeSet.weight" type="number"/><span class="suffix">kg</span>
                </div>
                <button @click="saveNewSet()">Save & new set</button>
              </div>

              <div class="savedSets">
                <div class="set" v-for="(set, idx) in savedSets.slice().reverse()" :key="idx">
                  <p v-if="savedSets">Set {{set.setNumber}}</p>
                  <div class="reps">
                    <div><span>{{set.reps}}</span> reps</div>
                  </div>
                  <div><span>{{set.weight}}</span> kg</div>
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
  name: 'LogWorkout',
  data() {
    return {
      searchExercise: '',
      currentExercise: 0,
      currentSet: 0,
      workoutStatus: '',
      activeExercise: '',
      activeSet: {
        reps: 10,
        weight: 50
      },
      savedSets:[],
      workout: {
        exercises: [],
      }
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
    finishExercise(){
      const exercise = {
        name: this.activeExercise.name,
        exerciseId: this.activeExercise.id,
        sets: this.savedSets
      }
      this.workout.exercises.push(exercise);
      this.savedSets = [];
      this.activeExercise = '';
    },
    saveNewSet(){
      const set = {
        setNumber: this.savedSets.length + 1,
        reps: this.activeSet.reps,
        weight: this.activeSet.weight
      }
      this.savedSets.push(set);
    },
    addRep(){
      this.activeSet.reps ++;
    },
    removeRep(){
      this.activeSet.reps --;
    },
    startExercise(exercise){
      console.log(exercise);
      this.activeExercise = exercise;
      this.searchExercise = '';
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
  z-index: 1000;
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

.set{
  background: $elBackground;
  display: flex;
  margin-bottom: 1rem;
  &.active{
    flex-direction: column;
    height: 20rem;
    justify-content: space-around;
  }
  justify-content: space-between;
  align-content: center;
  border-radius: 0.5rem;
  padding: 1rem;
  *{
    text-align: center;
  }
  .reps{
    display: flex;
    justify-content: space-around;
  }
}
</style>