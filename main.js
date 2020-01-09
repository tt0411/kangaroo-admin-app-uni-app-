import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import My from './pages/my/index.vue'
Vue.component('My', My)

import Data from './pages/data/index.vue'
Vue.component('Data', Data)

import Todo from './pages/todo/index.vue'
Vue.component('Todo', Todo)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



