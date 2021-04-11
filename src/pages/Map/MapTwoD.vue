<template>
    <div class="map-outbox">




        <el-row :gutter="20" type="flex"  >
            <el-col :span="4">
                <!--         侧边table -->
                <el-button type="text" @click="table = true">打开线路列表</el-button>
            </el-col>
            <el-col :span="3">
                <span class="text">里程：{{distance}}m</span>
                <span class="text">时间：{{time}}s</span>
            </el-col>

            <el-col :span="2">
                <el-button  @click="startAnimation"  size="mini">开始</el-button>
            </el-col>
            <el-col :span="2">
                <el-button  @click="pauseAnimation"  size="mini">暂停</el-button>
            </el-col>
            <el-col :span="2">
                <el-button  @click="resumeAnimation"  size="mini">继续</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="stopAnimation"  size="mini">停止</el-button>
            </el-col>
        </el-row>


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
<!--            车辆移动，进度条跟随变化：当前车辆已回放点的个数➗轨迹点总个数 （代码137行）-->
            <el-row :gutter="20">
                <el-col :span="4">
                    <span class="text">进度：</span>
                </el-col>
                <!--        进度条-->
                <el-col :span="18">
                    <el-slider
                            v-model="playProgress"
                            :max="100"
                            @visible-change="changeProgress($event)"
                            @visible-input="moveProgress($event)"
                    >
                    </el-slider>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="4">
                    <span class="text">速度：</span>
                </el-col>
                <!--        速度条-->
                <el-col :span="18">
                    <el-slider
                            v-model="markerSpeed"
                            show-input
                            show-stops
                            :max="300"
                            @change="changeSpeed($event)"
                    >
                    </el-slider>
                </el-col>
            </el-row>
        </div>


    </div>
</template>


<script>
    import { lineArr} from "./index.js";
    import routeTable from "../../components/Map/RouteTable";

    export default {
        name: "MapTwoD",
        components: {
            routeTable
        },
        data(){
            return {

                distance:1000,
                time:20,

                playProgress:0,//车辆当前回放到的百分比进度
                replayStart : 0,//当前回放的起点索引, 改变速度和改变进度条的时候，根据进度条百分比重新计算该数值，并从该位置开始再次回放


                marker: {},
                map: {},
                firstArr:lineArr[0],
                lastArr:lineArr[lineArr.length-1],
                polyline: {}, //最原始轨迹
                passedPolyline: {}, //最原始运动后的轨迹
                markerSpeed: 200, //运动速度,单位：千米/小时

                // havePassedLine: [], //已经运动的点
                // NoPassedLine: [], //未运动的点
                carInfoWindow:{},
                table: false,

                isPlay:false,



            }
        },
        mounted() {

            let that=this;
            // JSAPI2.0 使用覆盖物动画必须先加载动画插件
            AMap.plugin(['AMap.MoveAnimation','AMap.ToolBar', 'AMap.ControlBar', 'AMap.MapType', 'AMap.Scale', 'AMap.Geolocation'], function () {
                that.initMap();
                that.setTools();
                that.initCar();
                that.initLine();
            });
        },

        methods: {
            //初始化地图
            initMap() {
                this.map = new AMap.Map("container", {
                    resizeEnable: true, //窗口大小调整
                    center: this.firstArr, //中心 firstArr: [116.478935, 39.997761],
                    zoom: 20
                });


            },
            initCar(){
                //初始化小车
                this.marker = new AMap.Marker({
                    map: this.map,
                    position: this.firstArr,
                    icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                    offset: new AMap.Pixel(-13, -26),
                });

                // 创建跟速度信息展示框
                this.carInfoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(6, -25),
                    content: ""
                });


                // 创建一个 起点Icon
                var startIcon = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(25, 34),
                    // 图标的取图地址
                    image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                    // 图标所用图片大小
                    imageSize: new AMap.Size(135, 40),
                    // 图标取图偏移量
                    imageOffset: new AMap.Pixel(-9, -3)
                });

                // 将 icon 传入 marker
                var startMarker = new AMap.Marker({
                    position: this.firstArr,
                    icon: startIcon,
                    offset: new AMap.Pixel(-13, -30)
                });

                // 创建一个 终点icon
                var endIcon = new AMap.Icon({
                    size: new AMap.Size(25, 34),
                    image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                    imageSize: new AMap.Size(135, 40),
                    imageOffset: new AMap.Pixel(-95, -3)
                });

                // 将 icon 传入 marker
                var endMarker = new AMap.Marker({
                    position: this.lastArr,
                    icon: endIcon,
                    offset: new AMap.Pixel(-13, -30)
                });

                // 将 markers 添加到地图
                this.map.add( [startMarker, endMarker]);


            },


            //初始化轨迹
            initLine() {
                // 绘制轨迹
                this.polyline = new AMap.Polyline({
                    map: this.map,
                    path: lineArr,
                    showDir: true,
                    strokeColor: "#2288ff", //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6 //线宽
                    // strokeStyle: "solid"  //线样式
                });
                //绘制路过了的轨迹
                this.passedPolyline = new AMap.Polyline({
                    map: this.map,
                    strokeColor: "#2288ff", //线颜色
                    //path: this.lineArr,
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6 //线宽
                    // strokeStyle: "solid"  //线样式
                });
                this.marker.on("moving", e => {
                    //获取已经经过点的长度
                    this.passedLineLength = e.passedPath.length;
                    //已经经过的点
                    this.havePassedLine = e.passedPath;

                    this.passedPolyline.setPath(e.passedPath);

                    let lastLocation = e.passedPath[e.passedPath.length - 1];
                    //窗口展示信息
                    this.setVehicleSpeedInWidowns(lastLocation);
                    //更新进度条,车辆移动，进度条跟随变化：当前车辆已回放点的个数➗轨迹点总个数
                    this.playProgress= Math.round((e.passedPath.length + this.replayStart) / lineArr.length * 100);
                    //console.log("什么时候到头？？"+this.playProgress+"  "+e.passedPath.length+" "+lineArr.length)
                    // 如果到头了，回到初始状态
                    if (e.passedPath.length+this.replayStart-1===lineArr.length) {
                        this.stopAnimation();
                    }

                });
                // 计算总路程 单位，米
                this.distance = Math.round(AMap.GeometryUtil.distanceOfLine(lineArr));
                this.time=this.distance/this.markerSpeed;

                this.map.setFitView(); //合适的视口
            },

            playAnimation(){
                if (this.marker) {
                    this.marker.stopMove();
                }
                //计算需要回放的路径
                let replayPath = [];
                let replayDistance=0;
                for (var i = this.replayStart; i < lineArr.length; i++) {
                    replayPath.push(lineArr[i]);
                }
                console.log("replayPath")
                console.log(replayPath)

                replayDistance = Math.round(AMap.GeometryUtil.distanceOfLine(replayPath));

                this.marker.moveAlong(replayPath, {
                    // 每一段的时长
                    duration: replayDistance/this.markerSpeed*50,
                    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                    autoRotation: true,
                });
                //this.marker.moveAlong(replayPath, this.markerSpeed);


            },

            startAnimation() {
                this.isPlay=true;
                this.playProgress=0;
                this.replayStart=0
                //以指定的速度，点标记沿指定的路径移动。参数path为轨迹路径的经纬度对象的数组；speed为指定速度，单位：千米/小时，不可为0；
                this.marker.moveAlong(lineArr, {
                    // 每一段的时长,这里单位可能是毫秒
                    duration: this.distance/this.markerSpeed*50,
                        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                        autoRotation: true,
                });
                 //this.marker.moveAlong(lineArr, this.markerSpeed);
            },

            pauseAnimation() {
                this.isPlay=false;
                this.marker.pauseMove();
            },
            resumeAnimation() {
                this.isPlay=true;
                this.marker.resumeMove();
            },
            //停止动画，重置
            stopAnimation() {
                this.isPlay=false;
                this.marker.stopMove();

                let that=this
                setTimeout(function()  {
                    that.map.clearMap(), //清除所有覆盖物
                    that.initCar(),
                    that.initLine(),
                    that.playProgress=0,
                    that.replayStart=0
                }, 2000);


            },

            //修改速度，车辆从当前位置按新速度回放: 当前车辆停止回放，从当期位置到最后重新生成一段线路，车辆根据新轨迹回放
            changeSpeed(markerSpeed){

                // 拖动速度条，放下后触发： 设定车辆速度为当前指定的速度 v-model自动设定
                //Round函数返回四舍五入运算的结果。

                this.replayStart = Math.round(lineArr.length * this.playProgress / 100);

                if(this.isPlay){
                    console.log(markerSpeed)
                    this.playAnimation();
                }


            },
            //窗口动态显示
            setVehicleSpeedInWidowns(lastLocation){

                this.carInfoWindow.setContent("速度:"+this.markerSpeed+"米/秒");
                // 打开速度框
                this.carInfoWindow.open(this.map, lastLocation);
            },
            //进度条滑块移动
            moveProgress(playProgress){
                //手动拖动进度条过程中触发：移动车辆，定位车辆回放位置
                let currentIndex = Math.round(lineArr.length * playProgress / 100);//数组下标
                this.marker.setPosition(lineArr[currentIndex]);

            },
            //进度条放下后事件
            // 拖动速度条，放下后触发： 设定车辆速度为当前指定的速度
            changeProgress(playProgress){
                //拖动进度条，确定释放后触发，从当前位置开始回放
                //Round函数返回四舍五入运算的结果。
                this.replayStart = Math.round(lineArr.length * playProgress / 100);
                if(this.isPlay){
                    this.playAnimation();
                }
            },

            setTools(){

                //添加控件-比例尺控件
                this.map.addControl(new AMap.Scale());
                //添加控件-工具条控件
                this.map.addControl(new AMap.ToolBar());

                //地图类型切换
                let type= new AMap.MapType({
                    defaultType:0 //使用2D地图
                });
                this.map.addControl(type);
            },


        }


    }
</script>

<style scoped>
    @import '../../assets/css/map.css';
</style>
