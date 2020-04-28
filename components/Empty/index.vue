<template>
	<view>
		<view class="empty" v-if="type === 1">
		<view class="img">
			  <image style="width: 400upx;height: 300upx;" :src="emptyList[0]"></image>
		</view>
		<view class="text">暂无待审核内容</view>
	 </view>
	 <view class="empty" v-if="type === 2">
	 		<view class="img">
	 			  <image style="width: 300upx;height: 300upx;" :src="emptyList[1]"></image>
				  <view class="text">暂无待审核主题</view>
	 		</view>
	 	</view>
		<view class="empty" v-if="type === 3">
				<view class="img">
					  <image style="width: 150upx;height:150upx;margin-bottom: 30upx;"  :src="emptyList[2]"></image>
						  <view class="text">功能暂未开通</view>
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
					require('../../static/noContent.png'),
					require('../../static/noTheme.png'),
					require('../../static/lock.png')
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
			color: #999999;
		}
	}
</style>
