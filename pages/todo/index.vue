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
		 	 :data-id="index">{{tabNav[index]}}
			 <view v-if="index === 0 && contentCount" class='cu-tag round sm bg-red' style="margin-left: 10upx;">{{contentCount}}</view>
			 <view v-if="index === 1 && themeCount" class='cu-tag round sm bg-red' style="margin-left: 10upx;">{{themeCount}}</view>
			 </view>
		 </scroll-view>
		 <view v-if="TabCur == 0" style="margin-top: 80px;">
			 <view v-if="contentList.length > 0">
		 	  <content-item :contentList="contentList" @refreshContent="fetchContentList" @refreshCount="fetchCount"></content-item>
		     </view>
			 <Empty :type="1" v-else/>
		 </view>
		  <view v-if="TabCur == 1" style="margin-top: 80px;">
			  <view v-if="themeList.length > 0">
			  <theme-item :themeList="themeList" @refreshTheme="fetchThemeList" @refreshCount="fetchCount"></theme-item>
			  </view>
			  <Empty :type="2" v-else/>
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
				contentList: [],
				themeCount: null,
				contentCount: null,
				allCount: null,
			}
		},
		onLoad() {
			this.fetchContentList();
			this.fetchThemeList();
			this.fetchCount();
		},
		methods: {
			fetchContentList() {
				uni.showLoading({
				    title: '加载中'
				});
				uni.request({
					url: `${BASEURL}/content/waitContentRoots`,
					success: (res) => {
						if(res.data.code === 200) {
						  this.contentList = res.data.list	
						}
					},
					complete: () => {
						 uni.hideLoading();
					}
				})
			},
			fetchThemeList() {
				uni.request({
					url: `${BASEURL}/theme/waitThemeRoots`,
					success: (res) => {
						if(res.data.code === 200) {
							this.themeList = res.data.list
						}
					}
				})
			},
			fetchCount() {
				uni.request({
					url: `${BASEURL}/content/waitDealCount`,
					success: (res) => {
						if(res.data.code === 200) {
							this.contentCount = res.data.contentCount
							this.themeCount = res.data.themeCount
						}
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			searchContent(e) {
				console.log(e.target.value)
				uni.showToast({
					title: '搜索功能暂未开通',
					icon: 'none'
                })
			},
		}
	}
</script>

<style scoped lang="scss">
   .page {
		height: calc(100vh - 50upx);
		.zw {
			width: 100%;
			height: 10rpx;
			background-color: #F5F5F5;
		}
	}
	
</style>
