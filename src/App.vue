<template>
    <div id="app" >

        <the-menu v-if="$route.meta.keepAlive"></the-menu>

        <the-header v-if="$route.meta.keepAlive"></the-header>

        <div  class="right-container" :class="{'collapse-ml': isCollapse}">

            <AppMain></AppMain>

        </div>

    </div>
</template>

<script>
  import TheHeader from './components/Base/TheHeader'
  import TheMenu from './components/Base/TheMenu'
  import AppMain from './components/Base/AppMain'

  import { mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      TheHeader,
      TheMenu,
      AppMain
    },
    computed: {
      ...mapState({
        isCollapse: (state) => state.common.isCollapse
      })
    },


}
</script >


<style lang="scss" >
    #app{
        ::-webkit-scrollbar {
            width: 0 !important;
        }
        ::-webkit-scrollbar {
            width: 0 !important;height: 0;
        }

    }
    .right-container{
        width: 100%;
        min-height: 100%;
        margin-left: 180px;
        transition: margin-left 0.28s;
    }
    .collapse-ml{
        margin-left: 64px
    }
</style>
