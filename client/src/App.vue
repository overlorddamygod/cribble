<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <b-container class="contain">
      <router-view/>
    </b-container>
  </div>
</template>
<script>


export default {
  
}
</script>
<style>
* {
  padding:0;
  margin:0;
  
}
#app {
  height:100vh;
  max-height:100vh;
  overflow: hidden;
}
.contain {
  height: 85%;
}
</style>
