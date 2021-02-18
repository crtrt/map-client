<template>
    <div class="setting">
        <div class="contentCol">
            <component :is="componentSrc"></component>
        </div>
    </div>
</template>

<script>
    import Info from '../components/Info'

    export default {
        name: 'setting',
        components: {
            Info,

        },
        data () {
            return {
                activeName: '个人信息',
                componentSrc: 'Info',
            }
        },
        mounted () {},
        methods: {
            handleClick (item) {
                this.activeName = item.name
                this.componentSrc = item.path
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/css/setting.scss';
</style>
