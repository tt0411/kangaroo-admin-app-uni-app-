<template>
	<view>
	<view class="cu-card dynamic" v-for="(item, index) in contentList" :key="index">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{ 'backgroundImage': 'url(' + item.imgUrl + ')'}" @click="previewImg(item.imgUrl)"></view>
					<view class="content flex-sub">
						<view>{{item.nickName}}</view>
						<view class="text-gray text-sm flex justify-between">
						 申请时间：{{item.create_time}}
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 20upx;text-indent: 20upx;min-height: 100upx;">
				{{item.context}}
			</view>
				<view v-if="item.img">
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view class="bg-img" :style="{ 'backgroundImage': 'url(' + item1 + ')'}"
						 v-for="(item1,index1) in item.img" :key="index1" @click="previewImg(item1)">
						</view>
					</view>
				</view> 
				 <view v-if="item.video">
					  <video style="width: 93.6%;margin-left: 3.2%;height: 300upx;"  id="myVideo" :src="item.video" controls></video>
				 </view>
				 <view v-if="item.audio" class="page-section page-section-gap" style="text-align: center;">
					<luch-audio :src="item.audio" :play.sync="audioPlay"></luch-audio>
				 </view>
			<view class="options">
				<button class="cu-btn bg-red margin-tb-sm" @click="unPass(item)">不通过</button>
				<button class="cu-btn bg-blue margin-tb-sm" @click="isPass(item)">通过</button>
			</view>
		</view>
	 </view>
	 <view :class="isShow ? 'cu-modal bottom-modal show' : 'cu-modal bottom-modal'" >
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
					<button class="cu-btn bg-gray margin-tb-sm" @click="hideModal">取消</button>
					<button class="cu-btn bg-blue margin-tb-sm" @click="submitIsPass">确定</button>
				</view>
	 	  </view>
	 	</view>
	 </view>
	 </view>
</template>

<script>
	import luchAudio from '../../components/luch-audio/luch-audio.vue'
	import {BASEURL} from '../../untils/index.js'
	export default {
		props: ['contentList'],
		components: { luchAudio },
		data() {
			return {
				isShow: false,
				remark: '',
				contentId: null,
				contentStatus: null,
				audioPlay: false,
			}
		},
		methods: {
			isPass(item) {
				this.isShow = true;
				this.contentId = item.id;
				this.contentStatus = 1;
			},
			unPass(item) {
				this.isShow = true;
				this.contentId = item.id;
				this.contentStatus = 2;
			},
			hideModal() {
				this.isShow = false;
			},
			writeRemark(e) {
				this.remark = e.detail.value;
			},
			previewImg(img) {
			 uni.previewImage({
				 urls: [img]
			 })
			},
			submitIsPass() {	
				let flag = this.contentStatus;
				let id = this.contentId;
				let remark = this.remark;
				uni.request({
					url: `${BASEURL}/content/isStopContent?flag=${flag}&id=${id}&remark=${remark}`,
					success: res => {
						if(res.data.code === 200) {
						 uni.showToast({
							title: '审核成功',
						 })
						 this.$emit('refreshContent')
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
			},
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
		margin: 30upx;	
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
