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
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				avatar: '',
				name: '',
				bgImgObj: {
					1: '../../static/winter.jpeg',
					2: '../../static/spring.jpeg',
					3: '../../static/spring.jpeg',
					4: '../../static/spring.jpeg',
					5: '../../static/summer.jpeg',
					6: '../../static/summer.jpeg',
					7: '../../static/summer.jpeg',
					8: '../../static/atumn.jpeg',
					9: '../../static/atumn.jpeg',
					10: '../../static/atumn.jpeg',
					11: '../../static/winter.jpeg',
					12: '../../static/winter.jpeg'
				},
				month: 0,
			}
		},
		onLoad() {
			 this.name = uni.getStorageSync('userName') || '管理员';
			 this.avatar = uni.getStorageSync('img') || 'https://i.loli.net/2020/01/14/S8JRmua6NipjBTr.png';
			 this.month = new Date().getMonth() + 1
		},
		methods: {
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
        color: #0081ff;
		width: 400upx;
		text-align: center;
		left: calc(50% - 200upx);
		font-size: 16px;
		font-weight: 600;
		// text-shadow: 0 5upx 5upx blue;
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
