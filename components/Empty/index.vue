<template>
	<view>
		<view class="empty" v-if="type === 1">
		<view class="img">
			  <image style="width: 50%;" mode="aspectFill" :src="emptyList[0]"></image>
		</view>
		<view class="text">暂无待审核内容</view>
	 </view>
	 <view class="empty" v-if="type === 2">
	 		<view class="img">
	 			  <image style="width: 50%;" mode="aspectFill" :src="emptyList[1]"></image>
				  <view class="text">暂无待审核主题</view>
	 		</view>
	 	</view>
	</view>
</template>

<script>
	export default {
		props: {
			 type: {
				type: Number,
				default: 1,
			}
		},
		data() {
			return {
				emptyList: [
					'https://i.loli.net/2019/11/08/4F5i1MXdWgUSxet.png',
					'https://i.loli.net/2019/11/07/IzRsylA7oe2UCjE.png',
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty {
		margin-top: 30upx;
		text-align: center;
		.text {
			margin-top: -50upx;
			color: #999999;
		}
	}
</style>
