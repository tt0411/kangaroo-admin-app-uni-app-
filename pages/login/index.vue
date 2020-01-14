<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">登录</block></cu-custom>
		<view class="logo">
			<view class="img">
				<image src="../../static/logo.png" style="width: 130upx;height: 130upx;"></image>
			</view>
			<view class="name">袋鼠空间管理端</view>
		</view>
		<view class="sign">
			<view class="line"></view>
			<view class="title">留存美好记忆</view>
			<view class="line"></view>
		</view>
		<view class="loginBox">
			<view class="cu-form-group">
				<view class="title"><text class="text-gray cuIcon-my text"></text></view>
				<input placeholder="请填写账号" @blur="getUser"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-gray cuIcon-attention text"></text></view>
				<input placeholder="请输入密码" type="password" @blur="getPwd"></input>
			</view>
			<view class="loginBtn">
			<button class="cu-btn round lg bg-gradual-blue text-white" @click="toLogin">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { BASEURL } from '../../untils/index.js'
	export default {
		data() {
			return {
				user: '',
				password: '',
			}
		},
		methods: {
			getUser(e) {
				this.user = e.target.value
			},
			getPwd(e) {
				this.password = e.target.value
			},
			toLogin() {
				if(!this.user) {
					uni.showToast({
					title: '请填写账号',
					icon: 'none'
				 })
				}else if(!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
				}else {
					let user = this.user
					let pwd = this.password
					uni.request({
						url: `${BASEURL}/user/rootLogin?phone=${user}&password=${pwd}`,
						success: (res) => {
							if(res.data.code === 200) {
							uni.setStorageSync('userName', res.data.name)
							uni.setStorageSync('img', res.data.img);	
						    uni.reLaunch({
							   url: '../todo/index'
						    })
							}else {
								uni.showToast({
									title: '登录失败',
									icon: 'none'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		background-color: #FFFFFF;
		height: 100vh;
	.logo {
		margin-top: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.name {
			margin-left: 30upx;
			font-size: 46upx;
			font-weight: 700;
			// letter-spacing: 10upx;
		}
	}
	.sign {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
		.line {
			background-color: #8a8686;
			height: 1upx;
			width: 120upx;
		}
		.title {
			color: #8a8686;
			margin: 0 30upx;
		}
	}
	.loginBox {
		margin-top: 80upx;
		.cu-form-group {
			margin:0 5%;
			border-bottom: 1upx solid #EEEEEE;
			border-top: none;
			.text {
				font-size: 46upx;
				margin-right: 30upx;
			}
		}
		.loginBtn {
			margin-top: 50upx;
			button {
				width: 80%;
				margin-left: 10%;
			}
		}
	}
}
</style>
