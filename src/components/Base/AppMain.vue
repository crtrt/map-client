<template>
    <div class="app-main-container">
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>

</template>

<script>

    export default {
        name: "AppMain",
    }
</script>


<style lang="scss" scoped>
    .app-main-container {
        position: absolute;
        width: 90%;
        height: calc(100% - 70px);
        margin: 10px;
        padding: 20px;
        /*background-color: #fff;*/
    }
</style>
