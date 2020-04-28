<template>
	 <scroll-view scroll-y class="page">
	 	<cu-custom bgColor="bg-gradual-blue"><block slot="content">数据分析</block></cu-custom>
	   <view v-if="!noData">
 		<view class="qiun-bg-white qiun-title-bar" style="width: 100%;">
 			<view class="qiun-title-dot-light">用户性别比例</view>
 		</view>
 		<view>
			<canvas canvas-id="sexPie" id="sexPie" class="charts-pie" @touchstart="touchSexPie"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar" style="width: 100%;">
			<view class="qiun-title-dot-light">用户在线/离线比例</view>
		</view>
		<view>
			<canvas canvas-id="livePie" id="livePie" class="charts-pie" @touchstart="touchLivePie"></canvas>
		</view>
		</view>
	  <view style="margin-top: 150upx;" v-if="noData">
	 		   <Empty :type="3"/>
	     </view>
	 	
</scroll-view>
 
 </template>
 
 <script>
 	import uCharts from '@/components/u-charts/u-charts.js';
	import Empty from '../../components/Empty/index.vue'
	import { BASEURL } from '../../untils/index.js'
 	var _self;
 	var canvaSexPie=null;
    var canvaLivePie=null;
 	export default {
		components: { Empty },
 		data() {
 			return {
 				cWidth:'',
 				cHeight:'',
 				pixelRatio:1,
 				serverData:'',
 				pieSexarr:[],
				pieLivearr:[],
				noData: false,
 			}
 		},
 		onLoad() {
 			_self = this;
 			this.cWidth=uni.upx2px(750);
 			this.cHeight=uni.upx2px(500);
 			this.getServerData();
 		},
 		methods: {
 			getServerData(){
 				uni.request({
 					url: `${BASEURL}/user/genderRate`,
 					success: res => {
						let formatData = []
						res.data.data.forEach(item => {
							formatData.push({
								name: item.sex,
								data: item.count
							})
						})
 						let Pie={series:[]};
 						Pie.series=formatData;
 						_self.showSexPie("sexPie",Pie);
 					}, 
 					fail: (err) => {
						this.noData = true
 					},
 				});
				uni.request({
					url: `${BASEURL}/user/liveRate`,
					success: res => {
						let formatData = []
						res.data.data.forEach(item => {
							formatData.push({
								name: item.status,
								data: item.count
							})
						})
						let Pie={series:[]};
						Pie.series=formatData;
						_self.showLivePie("livePie",Pie);
					}, 
					fail: (err) => {
						this.noData = true
					},
				});
 			},
 			showSexPie(canvasId,chartData){
				canvaSexPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{
					  show:true,
					  position:'right',
					  float:'center',
					  itemGap:10,
					  padding:15,
					  lineHeight:26,
					  margin:15,
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
				});
				this.pieSexarr=canvaSexPie.opts.series;
			},
			showLivePie(canvasId,chartData){
				canvaLivePie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{
					  show:true,
					  position:'right',
					  float:'center',
					  itemGap:10,
					  padding:15,
					  lineHeight:26,
					  margin:15,
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
				});
				this.pieLivearr=canvaLivePie.opts.series;
			},
 			touchSexPie(e){
 				canvaSexPie.showToolTip(e, {
 					format: function (item) {
 						return item.name + ':' + item.data 
 					}
 				});
 			},
			touchLivePie(e){
				canvaLivePie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
 		}
 	}
 </script>
 
 <style>
 page{background:#F2F2F2;width: 100%;}
 .qiun-bg-white{background:#FFFFFF;}
 .qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
 .qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
 .charts-pie{ height:500upx;background-color: #FFFFFF;width: 100%;}
 .legend-itme{width: 200upx; margin-left: 30upx; height:50upx;align-items:center;}
 .legend-itme-point{width: 20upx; height:20upx; margin: 15upx;  border: 1px solid #FFFFFF; border-radius: 20upx;background-color: #000000;}
 .legend-itme-text{height:50upx;line-height: 50upx;color: #666666;font-size: 26upx;}
 </style>