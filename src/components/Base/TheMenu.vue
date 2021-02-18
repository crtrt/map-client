// sidebar.vue
<template>
    <div class="sidebar-container" :class="{'collapse-width': isCollapse}">
        <div class="logo" :class="{'collapse-logo': isCollapse}">
            MAP SHOW
        </div>
        <el-menu
                :default-active="onRoutes"
                class="el-menu-vertical"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#10B9D3"
                mode="vertical"
                :collapse="isCollapse"
                unique-opened
                router
        >
            <el-menu-item index="dashboard">
                <i class="el-icon-menu"></i>
                <span slot="title">控制面板</span>
            </el-menu-item>
            <el-menu-item index="link1">
                <i class="el-icon-menu"></i>
                <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="link2">
                <i class="el-icon-document"></i>
                <span slot="title">导航二</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        computed: {
            onRoutes() {
                return this.$route.path.replace("/", "");
            },
            ...mapState({
                isCollapse: (state) => state.common.isCollapse
            })
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>

    .collapse-width {
        width: 64px !important;
    }
    .collapse-logo {
        font-size: 18px !important;
    }

    .sidebar-container {
        width: 180px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        transition: width 0.28s;
        z-index: 1001;
        overflow: hidden;
        .el-menu-vertical:not(.el-menu--collapse) {
            width: 180px;
        }
        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
            overflow-y: auto;
        }
        .logo {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 30px;
            text-align: center;
            background-color: rgb(48, 65, 86);
            color: #fff;
        }
    }
</style>
