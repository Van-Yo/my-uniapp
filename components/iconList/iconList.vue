<template>
	<view>
		<icon type="success" size="26"/>
		<icon v-for="(item,index) in list" :type="item" size="26"/>
	</view>
</template>

<script>
	export default {
		name:"iconList",
		data() {
			return {
				list:['success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
			};
		}
	}
</script>

<style>

</style>
