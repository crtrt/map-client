<template>
    <a-card>
        <div class="top">
            <a-row :gutter="16">
                <a-col :span="24">
                    <div id="amap-main"></div>
                    <!--          loading-->

                    <div class="control">
                        <span class='text'>时间：2小时35分钟</span>
                        <span class='text'>里程：300</span>

                        <el-button :class="type === 2?'suspend btn':'play btn'" @click="start" style="padding:0px" type="info">{{btnState}}</el-button>
                        <el-button class="stop btn" @click="stop"  style="padding:0px" type="info">停止</el-button>

                        <div class='step'>速度：<input
                                class="speedRange"
                                type="range"
                                min="50"
                                max="1000"
                                @change="rangechange"
                                step="50"
                                v-model="speed" /></div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script>
    import { lazyAMapApiLoaderInstance } from 'vue-amap'
    import icon from "../../assets/image/car.png";

    export default {
        name: 'MapThird',
        data () {
            return {
                speed: 100,
                map: {},
                loading: false,
                btnState:"开始",
                columns: [
                    {
                        title: '序号',
                        dataIndex: 'age',
                        key: 'age'
                    },
                    {
                        title: '车牌号',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '时间',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '位置',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '回放里程',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '总里程',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '速度',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '经度',
                        dataIndex: 'address',
                        key: 'address'
                    },
                    {
                        title: '纬度',
                        dataIndex: 'address',
                        key: 'address'
                    }
                ],
                data: [],
                lineArr: [ [116.478835, 39.997700],
                    [116.478900, 39.997700],
                    [116.478935, 39.997700],
                    [116.478935, 39.997733],
                    [116.478935, 39.997761],
                    [116.478939, 39.997825],
                    [116.478912, 39.998549],
                    [116.478912, 39.998549],
                    [116.478998, 39.998555],
                    [116.478998, 39.998555],
                    [116.479282, 39.99856],
                    [116.479658, 39.998528],
                    [116.479658, 39.998528],
                    [116.479658, 39.998453],
                    [116.480151, 39.998453],
                    [116.480784, 39.998302],
                    [116.480784, 39.998302],
                    [116.481149, 39.998184],
                    [116.481573, 39.997997],
                    [116.481863, 39.997846],
                    [116.482072, 39.997718],
                    [116.482362, 39.997718],
                    [116.483633, 39.998935],
                    [116.48367, 39.998968],
                    [116.478935, 39.999861]],
                navg: {},
                type: 1 // 1起点 2播放中 3暂停
            }
        },
        mounted () {
            const that = this
            lazyAMapApiLoaderInstance.load().then(() => {
                this.map = new AMap.Map('amap-main', {
                    resizeEnable: true,
                    center: [116.478935, 39.997761],
                    zoom: 17,


                })
                // this.setmarker()
                // AMap.event.addListener(this.map, "click", this.setlostain)
                AMap.plugin([
                    'AMap.ToolBar',
                    'AMap.Scale',
                    'AMap.OverView',
                    'AMap.MapType',
                    'AMap.Geolocation'
                ], function () {
                    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                    that.map.addControl(new AMap.ToolBar())

                    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                    that.map.addControl(new AMap.Scale())

                    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                    that.map.addControl(new AMap.OverView({ isOpen: true }))

                    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                    that.map.addControl(new AMap.MapType())

                    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                    that.map.addControl(new AMap.Geolocation())
                })
                this.polyline()
            })
        },
        methods: {
            rangechange (e) {
                console.log(e, this.s)
                this.navg.setSpeed(this.s)
            },
            // 绘制轨迹
            polyline () {
                const that = this
                this.loading = true
                AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier) {
                    if (!PathSimplifier.supportCanvas) {
                        alert('当前环境不支持 Canvas！')
                        return
                    }
                    // 创建一个巡航轨迹路线
                    var pathSimplifierIns = new PathSimplifier({
                        zIndex: 100, // 地图层级，
                        map: that.map, // 所属的地图实例
                        // 巡航路线轨迹列表
                        getPath: function (pathData, pathIndex) {
                            console.log(pathIndex)
                            return pathData.path
                        },
                        // hover每一个轨迹点，展示内容
                        getHoverTitle: function (pathData, pathIndex, pointIndex) {
                            if (pointIndex >= 0) {
                                return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
                            }
                            return pathData.name + '，点数量' + pathData.path.length
                        },
                        // 自定义样式，可设置巡航器样式，巡航轨迹样式，巡航轨迹点击、hover等不同状态下的样式，不设置则用默认样式，详情请参考api文档
                        // renderOptions:{}
                        // 绘制路线节点
                        renderOptions: {
                            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
                        }
                    })
                    // 设置数据
                    pathSimplifierIns.setData([{
                        name: '路线0',
                        path: that.lineArr
                    }])

                    // 对第一条线路（即索引 0）创建一个巡航器
                    that.navg = pathSimplifierIns.createPathNavigator(0, {
                        loop: false, // 循环播放
                        speed: 100, // 巡航速度，单位千米/小时
                        pathNavigatorStyle: {
                            width: 24,
                            height: 24,
                            // 使用图片
                            content: PathSimplifier.Render.Canvas.getImageContent(icon)
                        }
                    })
                    that.loading = false
                })
            },
            start () {
                if (this.type === 1) {
                    this.navg.start()// 调用方法开启动画
                    this.type = 2
                    this.btnState="暂停"
                } else if (this.type === 2) {
                    this.navg.pause()
                    this.type = 3
                    this.btnState="开始"
                } else {
                    this.navg.resume()
                    this.type = 2
                    this.btnState="暂停"
                }
            },
            stop () {
                this.navg.stop()
                this.type = 1
                this.btnState="开始"
            }
        }
    }
</script>

<style scoped>
    #amap-main {
        height: calc(100vh - 150px);
    }
    .control{
        position: absolute;
        width: 600px;
        height: 60px;
        background: rgba(0,0,0,0.6);
        bottom: 10px;
        left: 150px;
        border-radius: 5px;
        line-height: 60px;
        padding:0 20px;
        color: #fff;
        display: flex;
        align-items: center;
    }
    .btn{
        width: 28px;
        height: 28px;
        cursor: pointer;
        margin-left: 15px;
    }
    .play{
        /*background: url("../../assets/image/play_ico.png");*/
        background-position-x: -28px;
    }
    .stop{
        /*background: url("../../assets/image/play_ico.png");*/
        /*!*background-positio: ;*!*/
        background-position-x: -28px;
        background-position-y: 28px;
        /*margin-left: 10px;*/
    }
    /*.suspend{*/
    /*    background: url("../../assets/image/play_ico.png");*/
    /*    !*background-positio: ;*!*/
    /*    background-position-x: -28px;*/
    /*    background-position-y: 56px;*/
    /*}*/
    .loading{
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background: rgba(255,255,255,0.6);
        z-index: 88;
    }
    .step{
        width: 180px;
        margin-left: 30px;
    }
    .text{
        margin: 0 20px;
    }
</style>

