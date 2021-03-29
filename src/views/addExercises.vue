<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Cancel</a></div>
                <div class="float-right"><a @click="showCreateExercise = true">Add new +</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h5>{{workout.name}}</h5>
                <h1>Select exercises</h1>
                <div v-for="(exercise, idx) in exercises" :key="idx" class="list-item">
                    <!-- <h5>{{exercise.name}}</h5>
                    <p>{{exercise.description | trimLength}}</p> -->
                    <input type="checkbox" :id="exercise.id" :value="exercise.id" v-model="selectedExercises">
                    <label :for="exercise.id">{{ exercise.name }}</label>
                </div>
                <button @click="addExercises()">Add exercises</button>
            </div>
        </div>

        <div class="createExercise modal" v-show="showCreateExercise">
            <div class="modal-inner">
                <div class="header">
                  <h4>Add new exercise</h4>
                  <a @click="showCreateExercise = false">Close</a>
                </div>
                <form @submit.prevent>
                    <input v-model="newExercise.name" type="text" placeholder="Name"/>
                    <input v-model="newExercise.description" type="text" placeholder="Description"/>
                    <button @click="createExercise()">Save exercise</button>
                </form>
            </div>
        </div>
       

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddExercises',
  data() {
    return {
        workout: this.$route.params.workout,
        showCreateExercise: false,  
        selectedExercises: [],
        newExercise: {
            name: '',
            description: ''
      }
    }
  },
  components: {
  },
  filters: {
    trimLength(val) {
      if (val.length < 75) { return val }
      return `${val.substring(0, 75)}...`
    }
  },
  computed: {
    ...mapState(['userProfile', 'exercises']),
  },
  mounted(){
      this.$store.dispatch('getExercises');
  },
  methods: {
      addExercises(){
          console.log(this.selectedExercises);
          const workout = {
              id: this.workout.id,
              selectedExercises: this.selectedExercises
          }
          this.$store.dispatch('addExercisesToWorkout', workout);
      },
    createExercise(){
        this.$store.dispatch('createExercise', { 
            name: this.newExercise.name,
            description: this.newExercise.description,
        })
        this.newExercise.name = '';
        this.newExercise.description = '';
        this.showCreateExercise = false;
    }
  }
}
</script>

<style lang="scss">

</style>