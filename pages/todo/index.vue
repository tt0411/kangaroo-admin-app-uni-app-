<template>
	<view>
	 <scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">待审批</block></cu-custom>
		<view class="zw"></view>
	     <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索内容" v-model="searchValue" confirm-type="search" @confirm="searchContent"/>
			</view>
		</view>
		<view class="zw"></view>
		 <scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:2*CustomBar + 'px'}]">
		 	<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
		 	 :data-id="index">
		 		{{tabNav[index]}}
		 	</view>
		 </scroll-view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				tabNav: ['内容', '主题'],
				searchValue: ''
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			searchContent(e) {
				uni.showToast({
					title: e.target.value,
					icon: 'none'
                })
			}
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
