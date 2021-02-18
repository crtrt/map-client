<template>
  <div class="swiper">
    <div class="swiper-container">
      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.picImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { swiperList } from 'swiperList'

export default {
  name: 'swiper',
  data () {
    return {
      swiperList: []
    }
  },
  created () {
    this.swiperList = swiperList
  }
}
</script>

<style scoped>
@import '../../assets/css/swiper.css';
</style>
