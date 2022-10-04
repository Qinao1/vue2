<template>
  <div id="app">
    <Home/>
    <Login />
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
export default {
  name: "App",
  components: { Login, Home },
};
</script>
<style>
html,
body,
#app {
  height: 100%;
}
</style>
