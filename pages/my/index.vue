<template>
	<view class="page">
		<view class="bg">
		   <image :src="bgImgObj[month]" mode="widthFix" class="response"></image>
		</view>
		<view class="img">
			 <image :src="avatar" style="width: 60px;height: 60px;border-radius: 30px;"></image>
		</view> 
		<view class="name">{{name}}</view>
		<view class="menuList">
			<!-- <view class="listItem">
				<view class="icon"><text class="lg text-gray" :class="'cuIcon-my'"></text></view>
				<view class="text">个人信息</view>
				<view class="arrow"><text class="lg text-gray" :class="'cuIcon-roundright'"></text></view>
			</view> -->
			<view style="width: 100%; height: 1upx; background-color: #EEEEEE;"></view>
			<view class="listItem" @click="logout">
				<view class="icon"><text class="lg text-gray" :class="'cuIcon-exit'"></text></view>
				<view class="text">退出</view>
				<view class="arrow"><text class="lg text-gray" :class="'cuIcon-roundright'"></text></view>
			</view>
		</view>
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
	</view>
</template>
<script>
	export default {
		data() {
			return {
				PageCur: 'my',
				avatar: '',
				name: '',
				bgImgObj: {
					0: '../../static/spring.jpeg',
					1: '../../static/spring.jpeg',
					2: '../../static/spring.jpeg',
					3: '../../static/summer.jpeg',
					4: '../../static/summer.jpeg',
					5: '../../static/summer.jpeg',
					6: '../../static/atumn.jpeg',
					7: '../../static/atumn.jpeg',
					8: '../../static/atumn.jpeg',
					9: '../../static/winter.jpeg',
					10: '../../static/winter.jpeg',
					11: '../../static/winter.jpeg'
				},
				month: 0,
			}
		},
		onLoad() {
			 this.name = uni.getStorageSync('userName') || '管理员';
			 this.avatar = uni.getStorageSync('img') || 'https://i.loli.net/2020/01/14/S8JRmua6NipjBTr.png';
			 this.month = new Date().getMonth()
			  
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				let page = e.currentTarget.dataset.cur
				uni.reLaunch({
				    url: `../${page}/index`
				});
			},
			logout() {
				uni.showModal({
				    title: '提示',
				    content: '是否确定退出',
				    success: function (res) {
				        if (res.confirm) {
				           uni.clearStorageSync()
						   uni.reLaunch({
						       url: '../login/index'
						   });
				        } else if (res.cancel) {
				           
				        }
				    }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		position: relative;	
		text-align: center;
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
		width: 400upx;
		text-align: center;
		left: calc(50% - 200upx);
		font-size: 16px;
		font-weight: 600;
		text-shadow: 0 5upx 5upx blue;
	}
	.menuList {
		background-color: #FFFFFF;
		width: 93.6%;
		margin-left: 3.2%;
		margin-top: 30upx;
		.listItem {
			padding: 20upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.icon{
				margin-right: 20upx;
				font-size: 40upx;
			}
			.text {
				flex: 1;
				font-size: 30upx;
			}
			.arrow {
				font-size: 40upx;
			}
		}
		.listItem:active {
			background-color: #e6e0de;
		}
	}
</style>
