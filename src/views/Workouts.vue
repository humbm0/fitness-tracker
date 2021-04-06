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
                <div v-for="(workout, idx) in workouts" :key="idx" class="list-item" @click="goToWorkout(workout)">
                    <h5>{{workout.name}}</h5>
                </div>
            </div>
        </div>

         <div class="modal" v-if="showCreateWorkout">
          <div class="modal-inner">
            <form @submit.prevent>
              <div class="header">
                  <h3>New workout</h3>
                  <a @click="showCreateWorkout = false">Close</a>
                </div>
              <div>
                <input v-model="newWorkout.name" type="text" id="workoutName" placeholder="Name"/>
              </div>

              <button @click="createWorkout">Create workout</button>

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
          name: ''
      },
      exercise: {
        name: '',
        reps: '',
        sets: '',
        rest: ''
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
    ...mapState(['userProfile', 'workouts']),
  },
  mounted(){
      this.$store.dispatch('getWorkouts');
  },
  methods: {
    goToWorkout(workout){
      this.$router.push({name:'Workout',params:{workoutId:workout.id}});
    },
    async createWorkout(){
        await this.$store.dispatch('createWorkout', { 
            name: this.newWorkout.name,
        })
        this.newWorkout.name = '';
        this.showCreateWorkout = false;
    }
  }
}
</script>

<style lang="scss">

</style>