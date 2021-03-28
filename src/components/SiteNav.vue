<template>
  <div class="navbar">
      <ul class="links">
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/workouts">Workouts</router-link>
        </li>
        <li>
          <router-link to="/exercises">Exercises</router-link>
        </li>
        <!-- <li>
          <router-link to="/settings">Settings</router-link>
        </li> -->
        <!-- <li><a @click="logout()">logout</a></li> -->
      </ul>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: $elBackground;
  display: flex;
  align-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  .links{
    width: 100%;
    height: 100%;
    align-content: center;
    display: flex;
    justify-content: space-around;
    ul, li{
      list-style: none;
      display: flex;
      align-content: center;
      a{
        align-self: center;
        font-size: 14px;
        opacity: 0.6;
        &.router-link-active{
          opacity: 1;
        }
      }
    }
    
  }
}

</style>