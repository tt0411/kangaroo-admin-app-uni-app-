<template>
	<view class="page">
		<view class="bg">
		   <image src="../../static/spring.jpeg" mode="widthFix" class="response"></image>
		</view>
		<view class="img">
			 <image :src="avatar" style="width: 60px;height: 60px;border-radius: 30px;"></image>
		</view> 
		<view class="name">{{name}}</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				name: '梦涛'
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		position: relative;	
	}
	.img {
		position: absolute;
		top: 150upx;  
		left: calc(50% - 30px)
	}
	.name {
		position: absolute;
		top: 150px;
        color: blue;
		left: calc(50% - 15px);
		font-size: 16px;
		font-weight: 600;
	}
</style>
