<template>
	<view>
	 <scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">数据分析</block></cu-custom>
	
		 </scroll-view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
   .page {
		height: 100vh;
		.zw {
			width: 100%;
			height: 30rpx;
			background-color: #F5F5F5;
		}
	}
	
</style>
