<template>
	<view>
	<view class="cu-card dynamic" v-for="(item, index) in themeList" :key="index">
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
			<view style="padding: 10upx 20upx;text-align: center;font-size: 32upx;">
				{{item.name}}
			</view>
			<view class="options">
				<button class="cu-btn bg-red margin-tb-sm" @click="unPass(item)">不通过</button>
				<button class="cu-btn bg-blue margin-tb-sm" @click="isPass(item)">通过</button>
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
	 </view>
</template>

<script>
  import {BASEURL} from '../../untils/index.js'
   export default {
		props: ['themeList'],
		data() {
			return {
				isShow: false,
				remark: '',
				themeId: null,
				themeStatus: null,
				audioPlay: false,
			}
		},
		methods: {
			isPass(item,status) {
				this.isShow = true;
				this.themeStatus = status;
				this.themeId = item.id;
				this.themeStatus = 1;
			},
			unPass(item) {
				this.isShow = true;
				this.contentId = item.id;
				this.themeStatus = 2;
			},
			hideModal() {
				this.isShow = false;
			},
			writeRemark(e) {
				this.remark = e.detail.value;
			},
			submitIsPass() {
				let flag = this.themeStatus;
				let id = this.themeId;
				let remark = this.remark;
				uni.request({
					url: `${BASEURL}/theme/checkTheme?flag=${flag}&id=${id}&remark=${remark}`,
					success: res => {
						if(res.data.code === 200) {
						 uni.showToast({
							title: '审核成功',
						 })
						 this.$emit('refreshTheme')
						 this.$emit('refreshCount')
						}else {
							uni.showToast({
								title: '审核失败',
								icon: 'none'
							})
						}	
					},
					complete: () => {
						this.isShow = false;
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
 .options {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: -20upx;
	margin-top: 10upx;
	.cu-btn {
		flex: 1;
	}
}
.modalBox {
	margin: 0 20upx 20upx 20upx;
	text-align: left;
	.textArea {
		margin-top: 10upx;
		padding: 20upx;
		font-size: 20upx;
		height: 160upx;
		border: 1px solid #EEEEEE;
	}
	.modalOptions {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  margin-top: 30upx;
	  .cu-btn {
		flex: 1;
		margin: 0 30upx;
	  }	
	}
}
</style>
