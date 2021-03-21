<template>
  <header>
      <div class="logo">
        <router-link to="/">
          <h3>Moove</h3>
        </router-link>
      </div>
      <ul class="links">
        <li>
          <router-link to="/">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/settings">Settings</router-link>
        </li>
        <li><a @click="logout()">logout</a></li>
      </ul>
  </header>
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

header{
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  .links{
    display: flex;
    ul, li{
      list-style: none;
    }
    li{
      padding-left: 1.5rem;
    }
  }
}

</style>