<template>
	<div class="tabbar">
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o">标签</van-tabbar-item>
			<van-tabbar-item icon="search" dot>标签</van-tabbar-item>
			<van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
			<van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		name: 'tabbar',
		data() {
			return {
				active : 0
			};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>