<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div class="float-right"><a @click="showCreateWorkout = true">Add new +</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>Workouts</h1>
                <div v-for="(workout, idx) in workouts" :key="idx" class="list-item">
                    <h5>{{workout.name}}</h5>
                </div>
            </div>
        </div>

        <div class="createExercise modal" v-show="showCreateWorkout">
            <div class="modal-inner">
                <div class="header">
                  <h4>Add new exercise</h4>
                  <a @click="showCreateWorkout = false">Close</a>
                </div>
                <form @submit.prevent>
                    <input v-model="newWorkout.name" type="text" placeholder="Name"/>
                    <input v-model="newWorkout.description" type="text" placeholder="Description"/>
                    <button @click="createExercise()">Save workout</button>
                </form>
            </div>
        </div>
       

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Workouts',
  data() {
    return {
      showCreateWorkout: false,  
      newWorkout: {
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
      this.$store.dispatch('getWorkouts');
  },
  methods: {
    createWorkout(){
        this.$store.dispatch('createWorkout', { 
            name: this.newWorkout.name,
            description: this.newWorkout.description,
        })
        this.newWorkout.name = '';
        this.newWorkout.description = '';
        this.showCreateWorkout = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.header-nav-bar{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}
.list-item{
    border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>