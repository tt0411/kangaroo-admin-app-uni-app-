<template>
	<view>
	 <scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">数据分析</block></cu-custom>
	      <view class="qiun-columns" :style="[{top: CustomBar+40 + 'px'}]">
	      		<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
	      			<view class="qiun-title-dot-light">饼图右侧图例</view>
	      		</view>
	      		<view class="qiun-charts qiun-rows">
	      			<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
				</view> -->
	      	</view>
		 </scroll-view>
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
	import uCharts from '../../components/u-charts/u-charts.js';
	import { bingData } from '../../untils/index.js'
	var _self;
	var canvaPie=null;
	export default {
		data() {
			return {
				PageCur: 'data',
				CustomBar: this.CustomBar,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				piearr:[]
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				let page = e.currentTarget.dataset.cur
				uni.reLaunch({
					url: `../${page}/index`
				});
			},
			getServerData(){
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data:{
				},
				success: function(res) {
					console.log(res.data.data)
					let Pie={series:[]};
					
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Pie.series=res.data.data.Pie.series;
					_self.showPie("canvasPie",Pie);
				},
				fail: () => {
					_self.tips="网络错误，小程序端请检查合法域名";
				},
			})
		 },
		 showPie(canvasId,chartData){
			canvaPie=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'pie',
				fontSize:11,
				legend:{
				  show:true,
				  position:'right',
				  float:'center',
				  itemGap:10,
				  padding:5,
				  lineHeight:26,
				  margin:5,
				  borderWidth :1
				},
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
					  labelWidth:15
					}
				},
			})
			this.piearr=canvaPie.opts.series;
		 },
		 touchPie(e){
			canvaPie.showToolTip(e, {
				format: function (item) {
					return item.name + ':' + item.data 
				}
			});
		 },
		}
	}
</script>

<style scoped lang="scss">
   .page {
		height: 100vh;
		.zw {
			width: 100%;
			height: 30upx;
			background-color: #F5F5F5;
		}
		.qiun-padding{padding:2%; width:96%;}
		.qiun-wrap{display:flex; flex-wrap:wrap;}
		.qiun-rows{display:flex; flex-direction:row !important;}
		.qiun-columns{display:flex; flex-direction:column !important;}
		.qiun-bg-white{background:#FFFFFF;}
		.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
		.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
		.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
		.charts-pie{width: 750upx; height:500upx;background-color: #FFFFFF;}
		.charts-right{display:flex;align-items:center;width: 250upx; height:500upx;background-color: #FFFFFF;}
		.legend-itme{width: 200upx; margin-left: 30upx; height:50upx;align-items:center;}
		.legend-itme-point{width: 20upx; height:20upx; margin: 15upx;  border: 1px solid #FFFFFF; border-radius: 20upx;background-color: #000000;}
		.legend-itme-text{height:50upx;line-height: 50upx;color: #666666;font-size: 26upx;}
	}
	
</style>
