<template>
	<view>
		<button size="mini" type="warn" :plain="true" :loading="loadingFlag" @click="submit">按钮</button>
	</view>
</template>

<script>
	export default {
		name:"myButton",
		data() {
			return {
				loadingFlag:false
			};
		},
		methods:{
			submit(){
				this.loadingFlag = true
				setTimeout(()=>{
					this.loadingFlag = false
				},3000)
			}
		}
	}
</script>

<style>

</style>
