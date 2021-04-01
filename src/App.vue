<template>
  <div id="app">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view class="page"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'

export default {
  components: {
    SiteNav,
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 0
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.page{
  height: calc(100vh - 64px);
  overflow: scroll;
}
</style>