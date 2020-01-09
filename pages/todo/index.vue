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
		 	  <content-item :contentList="contentList"></content-item>
		 </view>
		  <view v-if="TabCur == 1" style="margin-top: 80px;">
			  <theme-item :themeList="themeList"></theme-item>
			</view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
  </view>
</template>

<script>
import contentItem from './contentItem.vue'
import themeItem from './themeItem.vue'
	export default {
		components: { contentItem, themeItem },
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				tabNav: ['内容', '主题'],
				searchValue: '',
				imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				themeList: [
					{id: 1, nickName: '李一番', create_time: '2020-01-09 14:02:09', imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg', title: '那些年很很冒险的梦'},
					{id: 2, nickName: '张八万', create_time: '2020-01-09 14:02:09', imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg', title: '十八岁的天空'},
				],
				contentList: [
					{ 
					 id: 1, 
					 nickName: '张一三', 
					 create_time: '2020-01-07 10:45:23',
					 imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					 context: '春天来了，我们要去郊外踏春，还要在餐桌上“咬春”。作为一个热爱生活的吃货，那就以春天之名来一道家常随意卷饼吧！ 春天终于来了！虽然冬天的寒意还没有完全褪去，但万物复苏，总是给人欣欣向荣的好心情呀！该上班的上班，该上学的上学，该做的工作还是要继续，该...', 
					 img: ['https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905601259.png','https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905711355.png','https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905601267.png'],
					 video: null,
					 audio: null,
					 status: 0,
					 flag: 1,
				  },
				  {
					id: 2,
					nickName: '李二四', 
					create_time: '2020-01-06 10:45:23',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					context: '春天来了，我们要去郊外踏春，还要在餐桌上“咬春”。作为一个热爱生活的吃货，那就以春天之名来一道家常随意卷饼吧！ 春天终于来了！虽然冬天的寒意还没有完全褪去，但万物复苏，总是给人欣欣向荣的好心情呀！该上班的上班，该上学的上学，该做的工作还是要继续，该...', 
					img: null,
					video: 'https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA%28%E8%93%9D%E5%85%89%29.mp4',
					audio: null,
					status: 0,
					flag: 1,  
				  },
				  {
					id: 3,
					nickName: '王三五', 
					create_time: '2020-01-06 10:45:23',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					context: '春天来了，我们要去郊外踏春，还要在餐桌上“咬春”。作为一个热爱生活的吃货，那就以春天之名来一道家常随意卷饼吧！ 春天终于来了！虽然冬天的寒意还没有完全褪去，但万物复苏，总是给人欣欣向荣的好心情呀！该上班的上班，该上学的上学，该做的工作还是要继续，该...', 
					img: null,
					video: null,
					audio: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
					status: 0,
					flag: 1,    
				  }
				]
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
			},
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
