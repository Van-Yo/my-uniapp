<template>
	<view class="myProgress">
		<progress duration="50" percent="80" activeColor="red" :show-info="true" active stroke-width="20" border-radius="20"/>
	</view>
</template>

<script>
	export default {
		name:"myProgress",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.progress{
	width: 100%;
}
</style>
