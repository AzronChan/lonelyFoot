<template>
  <div id="app">
  	<p style="font-size: 1rem;">重案发生大的</p>
    <router-view/>
     <tab-bar/>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';

(function() {
	var html = document.querySelector("html"),
		rem = html.offsetWidth / 7.5;
	html.style.fontSize = rem + "px";
})();

export default {
  name: 'App',
	components: {
			TabBar
	},
	mounted(){
	}
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
