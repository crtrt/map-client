<template>
    <div class="map-outbox">

<!--         侧边table -->
        <el-button type="text" @click="table = true">打开线路列表</el-button>

<!--         地图 -->
        <div id="container"></div>


        <el-drawer
                title="我嵌套了表格!"
                :visible.sync="table"
                direction="rtl"
                size="50%">
            <route-table class="map-table" ></route-table>
        </el-drawer>

        <div class="control">
            <span class='text'>时间：2小时35分钟</span>
            <span class='text'>里程：300</span>
            <el-button  @click="startAni" style="padding:0px" type="info">开始</el-button>
            <el-button  @click="continueAni" style="padding:0px" type="info">继续</el-button>
            <el-button  @click="pauseAni"  style="padding:0px" type="info">暂停</el-button>

            <div class='step'>路途时间：<input
                    class="speedRange"
                    type="range"
                    min="10000"
                    max="100000"
                    @change="rangechange"
                    step="50"
                    v-model="speedDuration" /></div>
        </div>



    </div>
</template>

<script>
    import { linePath } from "./index.js";
    // import car from "../../assets/image/car.png";
    import routeTable from "../../components/Map/RouteTable";


    export default {
        name: "index",
        components: {
            routeTable
        },
        data() {
            return {
                map: null,
                speed: 100,

                trackAni:null,
                table: false,
                loading: false,
                speedDuration:20000,

            };
        },

        mounted() {


            this.init();


        },
        methods: {
            rangechange (e) {

                console.log(e, this.speedDuration)
                this.trackAni.setDuration(this.speedDuration)
            },
            getSpeed(){
                this.speed=this.speedDuration;
            },


            init() {

                this.map = new BMapGL.Map('container'); // 创建Map实例
                this.map.centerAndZoom(new BMapGL.Point(39.997761, 116.478935), 17);    // 初始化地图，设置中心点坐标和地图级别
                this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放


                var point = [];
                for (var i = 0; i < linePath.length; i++) {
                    var poi = new BMapGL.Point(linePath[i].longitude, linePath[i].latitude);
                    point.push(poi);
                    var marker = new BMapGL.Marker(poi); //创建标注
                    this.map.addOverlay(marker); //将标注添加到地图中
                }
                //轨迹
                var pl = new BMapGL.Polyline(point,{strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});



                this.trackAni = new BMapGLLib.TrackAnimation(this.map, pl, {
                    overallView: true, // 动画完成后自动调整视野到总览
                    // tilt: 30,          // 轨迹播放的角度，默认为55
                    duration: this.speedDuration,   // 动画持续时长，默认为10000，单位ms
                    // delay: 3000        // 动画开始的延迟，默认0，单位ms
                });
                this.setTools();

            },
            setTools(){
                let that = this;
                //添加地图类型控件
                that.map.addControl(new BMap.MapTypeControl());

            },
            startAni() {
                this.trackAni.start()
            },

            continueAni(){
                this.trackAni.continue()
            },
            pauseAni() {
                this.trackAni.pause()

            },

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .map-outbox {
        width: 100%;
        height: 80%;
        /*padding: 20px;*/
        /*border: 1px solid #ddd;*/
        margin: auto;
    }
    #container {
        width:900px;
        height: 400px;
    }

    .map-table{
        width: 150px;
        right: 0;
        position: absolute;
        top: 0;
        z-index: 200;
    }

    .control{
        position: absolute;
        width: 600px;
        height: 60px;
        background: rgba(0,0,0,0.6);
        bottom: 0px;
        left: 150px;
        border-radius: 5px;
        line-height: 60px;
        padding:0 20px;
        color: #fff;
        display: flex;
        align-items: center;
    }

    .text{
        margin: 0 20px;
    }
</style>

