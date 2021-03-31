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
<!--            <el-table :data="gridData">-->
<!--                <el-table-column property="date" label="日期" width="150"></el-table-column>-->
<!--                <el-table-column property="name" label="姓名" width="200"></el-table-column>-->
<!--                <el-table-column property="address" label="地址"></el-table-column>-->
<!--            </el-table>-->
            <route-table class="map-table" ></route-table>
        </el-drawer>



        <!-- 进度条 -->
        <div class="map-control">
            <Icon
                    v-if="!isPlay"
                    class="play-icon"
                    type="ios-play"
                    @click="isPlay=true;navgControl(playIcon)"
            />
            <Icon v-else class="play-icon" type="ios-pause" @click="isPlay=false;navgControl('pause')"/>
            <span class="passed-time">{{passedTime}}</span>
            <Slider class="map-slider" v-model="sliderVal" :tip-format="hideFormat" :step="0.0001"></Slider>
            <div class="map-times" @mouseenter="isTimesChoose=true" @mouseleave="isTimesChoose=false">
                <div class="times-show">倍速 {{times}}</div>
                <div class="choose-box">
                    <ul v-show="isTimesChoose">
                        <li
                                v-for="item in speedList"
                                :key="item"
                                :class="{active:times==item}"
                                @click="changeSpeed(item)"
                        >倍速 {{item}}</li>
                    </ul>
                </div>
            </div>
            <span class="passed-time">{{totalTime}}</span>
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
                isOnSlider: false, //是否为手动鼠标拉动进度条
                playIcon: "resume", //开始按钮是重新开始还是继续
                isTimesChoose: false, //选择速度弹窗的open/close
                passedTime: "00:00:00", //已经走了的时间
                totalTime: "00:00:00", //已经走了的时间
                isPlay: false, //是否为播放
                sliderVal: 0, //进度条滑动速度
                speed: 100, //初始速度，km、h
                times: 1, //几倍速度播放
                navgtr: null, //巡航器
                speedList: [8, 4, 2, 1],
                pathList: [],
                trackList: [],

                trackAni:null,

                table: false,
                loading: false,
            };
        },

        mounted() {
            // //地图初始信息
            // let param = {
            //
            //     resizeEnable: true,
            //     rotateEnable:true,
            //     pitchEnable:true,
            //     zoom: 17, // 地图缩放范围
            //     pitch:80,
            //     rotation:-15,
            //     viewMode:'3D',//开启3D视图,默认为关闭
            //     buildingAnimation:true,//楼块出现是否带动画
            //
            //     expandZoomRange:true,
            //     zooms:[3,20],
            // };


            this.map = new BMapGL.Map('container'); // 创建Map实例
            this.map.centerAndZoom(new BMapGL.Point(39.997761, 116.478935), 17);    // 初始化地图，设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

            // setTimeout(() => {
            //
                this.init();
            // }, 500);

        },
        methods: {
            init() {
                var point = [];
                for (var i = 0; i < linePath.length; i++) {
                    var poi = new BMapGL.Point(linePath[i].longitude, linePath[i].latitude);
                    point.push(poi);
                    var marker = new BMapGL.Marker(poi); //创建标注
                    this.map.addOverlay(marker); //将标注添加到地图中
                }


                var pl = new BMapGL.Polyline(point,{strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});

                var trackAni = new BMapGLLib.TrackAnimation(this.map, pl, {
                    overallView: true, // 动画完成后自动调整视野到总览
                    tilt: 30,          // 轨迹播放的角度，默认为55
                    duration: 20000,   // 动画持续时长，默认为10000，单位ms
                    delay: 3000        // 动画开始的延迟，默认0，单位ms
                });

                trackAni.start();
                this.setTools();
        //
        //         // 创建起始和经过的icon
        //         marks.forEach(item => {
        //             this.addMarker(item);
        //         });

                // // 轨迹
                // let trackList = linePath;
                // let len = trackList.length;
                // let startPoint = trackList[0];
                // let endPoint = trackList[len - 1];
                // this.pathList.splice(0, this.pathList.length);
                // trackList.forEach(item => {
                //     this.pathList.push([item.longitude, item.latitude]);
                //     item.stampTime = new Date(item.time).getTime(); //当前时间戳
                // });
                // // 下一段路程经历了多少s,intervalTime,nextDistance:下一段路程：m,nextDistance:下一段路速度：km/h
                // trackList.forEach((item, i) => {
                //     let next = trackList[i + 1];
                //     if (next) {
                //         item.intervalTime = (next.stampTime - item.stampTime) / 1000;
                //         item.nextDistance = this.distanceFun(
                //             [item.longitude, item.latitude],
                //             [next.longitude, next.latitude]
                //         );
                //         item.nextSpeed =
                //             item.nextDistance / 1000 / (item.intervalTime / 60 / 60);
                //     }
                // });
                // // 订单记录总时间，hh:mm:ss
                // this.totalTime = this.getTime(
                //     (endPoint.stampTime - startPoint.stampTime) / 1000
                // );
                // this.trackList = trackList;
                // this.setPath();
                // this.drag();
                //




            },
            setTools(){
                let that = this;
                //添加地图类型控件
                that.map.addControl(new BMap.MapTypeControl());


            },
        //     setPath() {
        //         let that = this;
        //
        //         let point = that.linePath;
        //
        //         for (var i = 0; i < that.linePath.length; i++) {
        //             point.push(new BMapGL.Point(that.linePath[i].longitude, that.linePath[i].latitude));
        //         }
        //         let pl = new BMapGL.Polyline(point);
        //
        //         that.trackAni = new BMapGLLib.TrackAnimation(that.map, pl, {
        //             overallView: true, // 动画完成后自动调整视野到总览
        //             tilt: 30,          // 轨迹播放的角度，默认为55
        //             duration: 20000,   // 动画持续时长，默认为10000，单位ms
        //             delay: 3000        // 动画开始的延迟，默认0，单位ms
        //         });
        //
        //         that.trackAni.start();
        //
        //
        //     },
            // 开始、暂停、继续等操作
            navgControl(action) {
                if (action === "start") {
                    let that = this;
                    this.sliderVal = 0;
                    this.passedTime = "00:00:00";
                    setTimeout(() => {
                        that.navgtr[action]();
                    }, 300);
                } else {
                    this.navgtr[action]();
                }
            },
            // 格式化时间
            getTime(sTime) {
                let ss;
                let mm = "00";
                let hh = "00";
                if (sTime > 60) {
                    let s = sTime % 60;
                    ss = s > 9 ? s : "0" + s;
                    let mTime = parseInt(sTime / 60);
                    if (mTime > 60) {
                        let m = mTime % 60;
                        mm = m > 9 ? m : "0" + m;
                        hh = parseInt(mTime / 60);
                    } else {
                        mm = mTime > 9 ? mTime : "0" + mTime;
                    }
                } else {
                    ss = sTime > 9 ? sTime : "0" + sTime;
                }
                return hh + ":" + mm + ":" + ss;
            },
            hideFormat() {
                return null;
            },
            // 计算两个坐标点之间的距离
            distanceFun(point1, point2) {
                // point1:[longitude,latitude]
                let p1 = new AMap.LngLat(point1[0], point1[1]);
                let p2 = new AMap.LngLat(point2[0], point2[1]);
                let distance = Math.round(p1.distance(p2));
                return distance;
            },
            speedFun(point1, point2, time) {
                // point1,point2:经纬度数组，time:时间，s
                let distance = this.distanceFun(point1, point2);
                if (distance === 0) {
                    return 0;
                } else {
                    let speed = distance / 1000 / (time / 60 / 60);
                    // speed:km/h
                    return speed;
                }
            },
            drag(isRemove) {
                let that = this;
                let el = document.getElementsByClassName("ivu-slider-button-wrap")[0];
                let el2 = document.getElementsByClassName("ivu-slider-wrap")[0];

                if (isRemove) {
                    el && el.removeEventListener("mousedown", that.openSlider, false);
                    document.removeEventListener("mouseup", that.closeSlider, false);
                    el2 && el2.removeEventListener("click", that.sliderChange, false);
                    return false;
                }
                el2.addEventListener("click", that.sliderChange, false);
                el.addEventListener("mousedown", that.openSlider, false);
                // 此处用document是因为，滑动较为随意时，mouseup可能不是作用在el上
                document.addEventListener("mouseup", that.closeSlider, false);
            },
            openSlider() {
                this.isOnSlider = true;
            },
            closeSlider() {
                this.isOnSlider = false;
            },
            // 修改倍速
            changeSpeed(times) {
                this.isTimesChoose = false;
                this.times = times;
            },
            sliderChange(val) {
                let newVal = typeof newVal === "number" ? val : this.sliderVal;
                let num = parseInt((newVal / 100) * this.pathList.length);
                let decimal =
                    String((newVal / 100) * this.pathList.length).split(".")[1] || 0;
                this.navgtr.moveToPoint(num, Number("0." + decimal));
                this.pathSimplifierIns.renderLater();
            },
            addMarker(item) {
                // let marker = new BMapGL.Marker({
                //     icon:
                //         "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                //     position: [item.longitude, item.latitude],
                //     offset: new AMap.Pixel(-13, -30)
                // });

                let point = new BMapGL.Point(item.longitude, item.latitude);
                let myIcon = new BMapGL.Icon("markers.png", new BMapGL.Size(23, 25), {

                    anchor: new BMapGL.Size(10, 25),
                    imageOffset: new BMapGL.Size(0, 0 - 25)   // 设置图片偏移
                });
                // 创建标注对象并添加到地图
                let marker = new BMapGL.Marker(point, {icon: myIcon});
                this.map.addOverlay(marker);
            }
        },
        beforeDestroy() {
            this.navgtr = null;
            this.drag(true);
        },
        watch: {
            sliderVal(newVal) {
                if (!this.isOnSlider) {
                    return false;
                }
                this.sliderChange(newVal)
            }
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
    .amap-info-close {
        display: none;
    }
    .info-window span {
        color: #2e75f1;
    }
    .ivu-slider-bar {
        color: #fff;
        background: #fff;
        transition: all 0.2s linear;
    }
    .ivu-slider-button-wrap {
        transition: all 0.2s linear;
        top: -5px;
    }
    .ivu-slider-wrap {
        background-color: rgba(255, 255, 255, 0.5);
    }
    .ivu-slider-button {
        border: none;
        box-shadow: 0 0 0 3.5px rgba(230, 230, 230, 0.4);
    }

    .color-tag {
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 200;
        font-size: 14px;
    }
    .color-tag li {
        display: inline-block;
        border-radius: 4px;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #fff;
        cursor: pointer;
        margin-right: 2px;
    }
    .color-tag li.color-org {
        background-color: #ff8533;
        color: #fff;
    }
    .color-tag li.color-green {
        background-color: #46c51a;
        color: #fff;
    }
    .map-control {
        position: absolute;
        bottom: 0;
        width: 900px;
        z-index: 200;
        height: 80px;
        line-height: 80px;
        color: #fff;
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        padding: 0 40px;
    }
    .play-icon {
        font-size: 36px;
    }
    .map-slider {
        display: inline-block;
        width: 75%;
        margin-left: 15px;
        position: relative;
        top: 14px;
    }
    .passed-time {
        position: relative;
        top: 2px;
        display: inline-block;
        margin-left: 15px;
        font-size: 14px;
    }
    .map-times {
        display: inline-block;
        position: relative;
        margin-left: 15px;
    }
    .map-times .times-show {
        padding: 0 10px;
        line-height: 24px;
        font-size: 13px;
        border: 1px solid #fff;
        border-radius: 4px;
        cursor: default;
    }
    .map-times .choose-box {
        position: absolute;
        top: -135px;
        left: -6px;
        height: 162px;
        transition: all 0.5s linear;
    }
    .map-times ul {
        background: rgba(0, 0, 0, 0.7);
        padding: 10px;
        width: 70px;
        text-align: center;
        border-radius: 3px;
    }
    .map-times li {
        height: 26px;
        line-height: 26px;
        cursor: pointer;
    }
    .map-times li.active {
        color: #ff8533;
    }
    .map-times li:hover {
        font-size: 13px;
    }
    /* .marker {
      position: absolute;
      top: -20px;
      right: -118px;
      color: #fff;
      padding: 4px 10px;
      box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
      white-space: nowrap;
      font-size: 12px;
      font-family: "";
      background-color: #25a5f7;
      border-radius: 3px;
    } */
    .amap-icon img {
        width: 25px;
        height: 34px;
    }
    .map-table{
        width: 150px;
        right: 0;
        position: absolute;
        top: 0;
        z-index: 200;
    }
</style>

