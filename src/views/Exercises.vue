<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div class="float-right"><a @click="showCreateExercise = true">Add new +</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>Exercises</h1>
                <div v-for="(exercise, idx) in exercises" :key="idx" class="list-item" @click="goToExercise(exercise)">
                    <h5>{{exercise.name}}</h5>
                    <p>{{exercise.description | trimLength}}</p>
                </div>
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
  name: 'Exercises',
  data() {
    return {
      showCreateExercise: false,  
      showEditExercise: false,  
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
    goToExercise(exercise){
      this.$router.push({name:'Exercise',params:{exerciseId:exercise.id}});
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