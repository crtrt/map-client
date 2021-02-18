<template>

    <div class="topbar-container" style="text-align: right; font-size: 12px;" >
        <div class="toggle-btn" @click="toggleSidebar" >
            <i class="el-icon-full-screen"></i>
        </div>
        <el-dropdown v-if="username != null && username !==''" >
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item @click.native="signout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 30px">欢迎你! 用户：{{username}}</span>

    </div>

</template>

<script>

    import {mapGetters,mapState, mapActions} from "vuex";

    export default {
        name: "TheHeader",
        components: {

        },
        data () {
            return {
                Name: '多维交通展示系统',
            }
        },
        computed: {
            ...mapGetters([
                'userId',
                'username',
                // 'avator',
            ]),
            ...mapState({
                isCollapse: (state) => state.common.isCollapse
            })
        },
        created () {

            console.log("this.avator")
            console.log(this.avator)
        },
        mounted () {

        },

        methods: {
            ...mapActions(['toggleSidebar']),
            //退出登录
            signout(){
                this.$message('退出成功')
                this.$router.push({path: '/'})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .topbar-container {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        .toggle-btn {
            display: inline-block;
            padding: 0 20px;
        }
    }
</style>
