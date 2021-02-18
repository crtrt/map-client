import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import AMap from 'vue-amap'
import 'iview/dist/styles/iview.css'
import * as echarts from "echarts";




Vue.use(iView)
Vue.use(AMap)
AMap.initAMapApiLoader({
  // 高德的key
  key: 'c3e3a12bc3267c409ceea338a26d877c',
  // 插件集合
  plugin: ['AMapManager', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','Geocoder','Geolocation', 'AMap.MarkerClusterer','AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool', 'AMap.Driving', 'AMap.CitySearch', 'AMap.InfoWindow', 'AMap.LngLat', 'AMap.DistrictSearch', 'AMap.TileLayer.Traffic', 'AMap.Heatmap', 'AMap.Autocomplete', 'AMap.PlaceSearch'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '2.0'
})

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
