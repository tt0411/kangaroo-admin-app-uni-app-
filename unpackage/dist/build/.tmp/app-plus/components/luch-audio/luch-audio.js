(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/luch-audio/luch-audio"],{"19f2":function(t,n,e){},"82f8":function(t,n,e){"use strict";(function(t,e){function o(t){var n;return n=Math.floor(t/60),t%=60,n+="",t+="",n=1===n.length?"0"+n:n,t=1===t.length?"0"+t:t,n+":"+t}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"ComAudio",props:{play:{type:Boolean,required:!0},src:{type:String},poster:{type:String,default:""},name:{type:String,default:"未知音频"},author:{type:String,default:"未知作者"},autoplay:{type:Boolean,default:!1},loop:{type:Boolean,default:!1},obeyMuteSwitch:{type:Boolean,default:!0}},data:function(){return{audioTimeUpdate:"00:00",innerAudioContext:""}},methods:{audioPlay:function(){this.$emit("update:play",!0)},audioPause:function(){this.$emit("update:play",!1)},handleBtnClick:function(){this.$emit("update:play",!this.play)},contextInit:function(){console.log(t("创建"," at components\\luch-audio\\luch-audio.vue:103"));var n=this;n.$emit("update:play",!1);var u=e.createInnerAudioContext();u.autoplay=n.autoplay,u.src=n.src,u.loop=n.loop,u.obeyMuteSwitch=n.obeyMuteSwitch,u.onPlay(function(){n.audioTimeUpdate=o(Math.floor(u.currentTime)),n.audioPlay()}),u.onPause(function(){n.audioPause()}),u.onEnded(function(){n.audioPause()}),u.onTimeUpdate(function(){n.audioTimeUpdate=o(Math.floor(u.currentTime))}),u.onError(function(n){console.log(t(n," at components\\luch-audio\\luch-audio.vue:125"))}),this.innerAudioContext=u}},watch:{play:function(t){t?this.innerAudioContext.play():this.innerAudioContext.pause()},src:function(){this.innerAudioContext.destroy(),this.contextInit()}},created:function(){this.contextInit()},beforeDestroy:function(){this.innerAudioContext.destroy()}};n.default=u}).call(this,e("0de9")["default"],e("6e42")["default"])},a68c:function(t,n,e){"use strict";var o=e("19f2"),u=e.n(o);u.a},b56a:function(t,n,e){"use strict";e.r(n);var o=e("82f8"),u=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=u.a},c389:function(t,n,e){"use strict";e.r(n);var o=e("da25"),u=e("b56a");for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e("a68c");var i,c=e("f0c5"),r=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=r.exports},da25:function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",function(){return u}),e.d(n,"c",function(){return a}),e.d(n,"a",function(){return o})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/luch-audio/luch-audio-create-component',
    {
        'components/luch-audio/luch-audio-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("c389"))
        })
    },
    [['components/luch-audio/luch-audio-create-component']]
]);
