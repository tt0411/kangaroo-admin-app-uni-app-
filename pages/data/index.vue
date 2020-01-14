<template>
	<view>
	 <scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">数据分析</block></cu-custom>
	       <view style="margin-top: 150upx;">
			<Empty :type="3"/>
	      </view>
		 </scroll-view>
		<!-- <view class="cu-tabbar-height"></view> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="todo">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur==='todo'?'lg cuIcon-edit text-blue':'lg cuIcon-edit text-gray'"></text>
					<!-- <view class="cu-tag badge">99</view> -->
				</view>
				<view :class="PageCur==='todo'?'text-blue':'text-gray'">待办</view>
			</view>
			<view class="action" @click="NavChange" data-cur="data">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur==='data'?'lg cuIcon-rank text-blue':'lg cuIcon-rank text-gray'"></text>
				</view>
				<view :class="PageCur==='data'?'text-blue':'text-gray'">数据</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur==='my'?'lg cuIcon-my text-blue':'lg cuIcon-my text-gray'"></text>
				</view>
				<view :class="PageCur==='my'?'text-blue':'text-gray'">我的</view>
			</view>
		</view>
	</scroll-view>
  </view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	import Empty from '../../components/Empty/index.vue'
	export default {
		components: { Empty },
		data() {
			return {
				PageCur: 'data',
				CustomBar: this.CustomBar,
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				let page = e.currentTarget.dataset.cur
				uni.reLaunch({
					url: `../${page}/index`
				});
			},
		}
	}
</script>

<style scoped lang="scss">
   .page {
		height: 100vh;
		.zw {
			width: 100%;
			height: 30upx;
			background-color: #F5F5F5;
		}
	}
	
</style>
