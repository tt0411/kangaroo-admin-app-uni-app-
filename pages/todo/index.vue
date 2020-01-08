<template>
	<view>
	 <scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">待审核</block></cu-custom>
		<view class="zw"></view>
	     <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索内容" v-model="searchValue" confirm-type="search" @confirm="searchContent"/>
			</view>
		</view>
		 <scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:2*CustomBar + 'px'}]">
		 	<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
		 	 :data-id="index">{{tabNav[index]}}</view>
		 </scroll-view>
		 <view v-if="TabCur === 0" style="margin-top: 80px;">
		 	<view class="cu-card dynamic" v-for="(item, index) in contentList" :key="index">
		 		<view class="cu-item shadow">
		 			<view class="cu-list menu-avatar">
		 				<view class="cu-item">
		 					<view class="cu-avatar round lg" :style="{ 'backgroundImage': 'url(' + item.imgUrl + ')'}"></view>
		 					<view class="content flex-sub">
		 						<view>{{item.nickName}}</view>
		 						<view class="text-gray text-sm flex justify-between">
		 						 申请时间：{{item.create_time}}
		 						</view>
		 					</view>
		 				</view>
		 			</view>
		 			<view style="padding: 10rpx 20rpx">
		 				{{item.context}}
		 			</view>
						<!-- <view v-if="item.img.length === 1">
							<view class="grid flex-sub padding-lr col-1">
								<view class="bg-img only-img" :style="{ 'backgroundImage': 'url(' + item.img + ')'}">
								</view>
							</view>
						</view>
						<view v-if="item.img.length === 2">
							<view class="grid flex-sub padding-lr col-2 grid-square">
								<view class="bg-img" :style="{ 'backgroundImage': 'url(' + item + ')'}"
								 v-for="(item,index) in item.img" :key="index">
								</view>
							</view>
						</view>-->
						<view v-if="item.img">
							<view class="grid flex-sub padding-lr col-3 grid-square">
								<view class="bg-img" :style="{ 'backgroundImage': 'url(' + item1 + ')'}"
								 v-for="(item1,index1) in item.img" :key="index1">
								</view>
							</view>
						</view> 
						  <view v-if="item.video">
							  <video style="width: 93.6%;margin-left: 3.2%;"  id="myVideo" :src="item.video" controls></video>
						 </view>
						 <view v-if="item.audio" class="page-section page-section-gap" style="text-align: center;">
							 <audio style="text-align: left" :src="item.audio" :poster="imgUrl"  controls></audio>
						 </view>
		 			<view class="options">
						<button class="cu-btn bg-red margin-tb-sm" @click="isPass(item, status = 0)">不通过</button>
		 				<button class="cu-btn bg-blue margin-tb-sm" @click="isPass(item, status = 1)">通过</button>
		 			</view>
		 		</view>
		 	 </view>
		 </view>
		 <view class="cu-modal bottom-modal" :class="isShow ?'show':''">
		 	<view class="cu-dialog">
		 		<view class="cu-bar bg-white justify-end">
					<view class="content">审核意见</view>
		 			<view class="action" @tap="hideModal">
		 				<text class="cuIcon-close text-red"></text>
		 			</view>
		 		</view>
		 		<view class="modalBox">
		 			<view class="title">处理备注(非必填)</view>
					<view class="textArea">
						<textarea  @blur="writeRemark"></textarea>
					</view>
					<view class="modalOptions">
					<button class="cu-btn bg-gray margin-tb-sm" @click="isShow = false">取消</button>
					<button class="cu-btn bg-blue margin-tb-sm" @click="submitIsPass">确定</button>
				</view>
		 	</view>
		 	</view>
		 </view>
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
				searchValue: '',
				imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				isCard: true,
				isShow: false,
				remark: '',
				contentId: null,
				contentStatus: null,
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
			isPass(item,status) {
				this.isShow = true;
				this.contentStatus = status;
				this.contentId = item.id;
				console.log(this.contentId)
				// uni.showToast({
				// 	title: status == 1 ? '通过' : '不通过',
				// 	icon: 'none'
				// })
			},
			hideModal() {
				this.isShow = false;
			},
			writeRemark(e) {
				this.remark = e.detail.value;
			},
			submitIsPass() {
				this.isShow = false;
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
		.options {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: -20rpx;
			margin-top: 10rpx;
			.cu-btn {
				flex: 1;
			}
		}
		.modalBox {
			margin: 0 20rpx 20rpx 20rpx;
			text-align: left;
			.textArea {
				margin-top: 10rpx;
				padding: 20rpx;
				font-size: 20rpx;
				height: 160rpx;
				border: 1px solid #EEEEEE;
			}
			.modalOptions {
			  display: flex;
			  flex-direction: row;
			  justify-content: space-between;
			  margin-top: 30rpx;
			  .cu-btn {
			  	flex: 1;
				margin: 0 30rpx;
			  }	
			}
		}
	}
	
</style>
