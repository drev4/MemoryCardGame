<template>
  <Toolbar />
  <div id="main-app">
      <router-view/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue';

export default {
    name: "App",
    components: { Toolbar }
};
</script>

<style scoped>
</style>
