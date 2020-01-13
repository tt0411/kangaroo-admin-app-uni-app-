<template>
	<view>
	 <scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">待审核</block></cu-custom>
	     <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索内容" v-model="searchValue" confirm-type="search" @confirm="searchContent"/>
			</view>
		</view>
		 <scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top: CustomBar+40 + 'px'}]">
		 	<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
		 	 :data-id="index">{{tabNav[index]}}</view>
		 </scroll-view>
		 <view v-if="TabCur == 0" style="margin-top: 80px;">
			 <view v-if="contentList.length > 0">
		 	  <content-item :contentList="contentList" @refreshContent="fetchContentList"></content-item>
		     </view>
			 <Empty :type="1" v-else/>
		 </view>
		  <view v-if="TabCur == 1" style="margin-top: 80px;">
			  <view v-if="themeList.length > 0">
			  <theme-item :themeList="themeList" @refreshTheme="fetchThemeList"></theme-item>
			  </view>
			  <Empty :type="2" v-else/>
			</view>
		<!-- <view class="cu-tabbar-height"></view> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="todo">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur==='todo'?'lg cuIcon-edit text-blue':'lg cuIcon-edit text-gray'"></text>
					<view class="cu-tag badge">99</view>
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
import contentItem from './contentItem.vue'
import themeItem from './themeItem.vue'
import Empty from '../../components/Empty/index.vue'
import { BASEURL } from '../../untils/index.js'
	export default {
		components: { contentItem, themeItem, Empty },
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				tabNav: ['内容', '主题'],
				PageCur: 'todo',
				searchValue: '',
				imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				themeList: [],
				contentList: []
			}
		},
		onLoad() {
			this.fetchContentList();
			this.fetchThemeList();
		},
		methods: {
			fetchContentList() {
				uni.request({
					url: `${BASEURL}/content/waitContentRoots`,
					success: (res) => {
						this.contentList = res.data.list
					}
				})
			},
			fetchThemeList() {
				uni.request({
					url: `${BASEURL}/theme/waitThemeRoots`,
					success: (res) => {
						this.themeList = res.data.list
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			searchContent(e) {
				uni.showToast({
					title: e.target.value,
					icon: 'none'
                })
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				let page = e.currentTarget.dataset.cur
				uni.reLaunch({
				    url: `../${page}/index`
				});
			}
		}
	}
</script>

<style scoped lang="scss">
   .page {
		height: 100vh;
		.zw {
			width: 100%;
			height: 10rpx;
			background-color: #F5F5F5;
		}
	}
	
</style>
