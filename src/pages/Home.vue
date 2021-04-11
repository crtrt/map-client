<template>
   <div class="home">
      <!--轮播图-->
      <swiper/>

      <div class="section">
        项目简介
      </div>


   </div>
</template>

<script>
   import Swiper from '../components/Base/Swiper'
   import {mapGetters} from "vuex";
    export default {
        name: "Home",
       components: {
          Swiper,

       },
       computed: {
          ...mapGetters([
             'userId',
          ])
       },
       mounted() {
          // 先登录
          console.log("Userid:"+this.userId)



       },

    }
</script>

<style  scoped>

</style>
