<template>
    <div class="container">
        <div class="row">
            <div class="header-nav-bar">
                <div><a @click="$router.go(-1)">Back</a></div>
                <div class="float-right"><a @click="showEditExercise = true">Edit</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>{{exercise.name}}</h1>
                <p>{{exercise.description}}</p>
            </div>
        </div>

        <div class="createExercise modal" v-show="showEditExercise">
            <div class="modal-inner">
                <div class="header">
                  <h4>Edit exercise</h4>
                  <a @click="showEditExercise = false">Close</a>
                </div>
                <form @submit.prevent>
                    <input v-model="exercise.name" type="text" />
                    <textarea v-model="exercise.description" type="text" />
                    <button @click="updateExercise()">Save exercise</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Exercise',
  data() {
    return {
      showEditExercise: false,
    }
  },
  components: {
  },
  computed: {
    ...mapState(['userProfile', 'exercise']),
  },
  mounted(){
    this.$store.dispatch('getExercise', { 
        id: this.$route.params.exerciseId
    });    
  },
  methods: {
    async updateExercise(){
        this.$store.dispatch('updateExercise', { 
            id: this.exercise.id,
            name: this.exercise.name,
            description: this.exercise.description,
        })
        this.showEditExercise = false;
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
</style>