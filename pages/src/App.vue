<template>
  <div id="app">
  	<van-nav-bar
      title="页面"
      left-text=""
      right-text="按钮"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="main">
    	<router-view/>
    </div>
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
  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    }
  }
};
</script>

<style lang="scss">
@import url("./assets/css/base.scss");

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}
.main {
	padding: 0.92rem 0 1rem 0;
}
</style>
