<template>
	<view>
		<!-- <view class="top">
			<text @click="chooseFile">选取文件</text>
			
		</view>
		<u-sticky  offset-top="-44" style="background-color: #fff;"><u-tabs :list="list2"></u-tabs></u-sticky>
		
		<view class="buttom">
			<u--textarea v-model="base64str" placeholder="请输入内容" autoHeight ></u--textarea>
		</view> -->
		1234
	</view>
</template>

<script>
	// const plugin = uni.requireNativePlugin('GW-ChooseFileModule')
	export default {
		data() {
			return {
				base64str:'',
				list2: [
					{
						name: '关注'
					},
					{
						name: '推荐'
					},
					{
						name: '电影'
					},
					{
						name: '科技'
					},
					{
						name: '音乐'
					},
					{
						name: '美食'
					},
					{
						name: '文化'
					},
					{
						name: '财经'
					},
					{
						name: '手工'
					}
				]
			}
		},
		methods: {
			H5PlusReadFileArrayBuffer(filePath){
			  return new Promise((resolve, reject) => {
			    try {
			      plus.io.resolveLocalFileSystemURL(
			        filePath,
			        function (entry) {
			          entry.file(function (file) {
			            const fileReader = new plus.io.FileReader()
			            /* 
			              2023.5 更新此处注释：
			              如果是Android10+，且用户选择的是原图(原始文件路径)，可能无法使用readAsDataURL读取，会导致一直等待。
			              暂时没有什么好的办法，具体参考：https://ask.dcloud.net.cn/article/36199
			            */
			            fileReader.readAsDataURL(file, 'utf-8')
			            fileReader.onloadend = function (evt) {
			              const result = {
			                base64: evt.target.result.split(',')[1],
			                size: file.size,
			              }
			              resolve(result.base64)
			            }
			          })
			        },
			        function (error) {
			          reject(error)
			        },
			      )
			    } catch (error) {
			      reject(error)
			    }
			  })
			},
			chooseFile(){
				plugin.chooseFile(
				    {
				        count: 1
				    },
				    res => {
						this.H5PlusReadFileArrayBuffer(res.files[0].path).then(res=>{
							console.log(res);
							this.base64str = res
						}).catch(err=>{
							console.log(err);
						})
				    }
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
.top{
	width: 100%;
	height: 300rpx;
	background: red;
	padding-top:100rpx;
	padding-left: 40rpx;
}
.buttom{
	width: 100%;
	height: 1300rpx;
	background: green;
}
</style>
