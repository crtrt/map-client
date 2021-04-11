<template>
    <div class="page_demo">
        <div id="container" class='container' > </div>
    </div>
</template>

<script>
    // import AMap from 'AMap'
    export default {
        data () {
            return {
                marker: {},
                map: {},
                firstArr: [116.478935, 39.997761],
                polyline: {}, //最原始
                passedPolyline: {}, //最原始
                newPolyline: {}, //速度改变后新轨迹
                newPassedPolyline: {}, //速度改变后的新轨迹
                markerSpeed: 200, //运动速度
                speedCount: 1, //速度计数
                havePassedLine: [], //已经运动的点
                NoPassedLine: [], //未运动的点

            }
        },
        mounted() {
            this.initMap();
            this.initroad();
        },

        methods: {
            //初始化地图
            initMap() {
                this.map = new AMap.Map("container", {
                    resizeEnable: true, //窗口大小调整
                    center: this.firstArr, //中心 firstArr: [116.478935, 39.997761],
                    zoom: 20
                });
                this.marker = new AMap.Marker({
                    map: this.map,
                    position: this.firstArr,
                    icon: "https://webapi.amap.com/images/car.png",
                    offset: new AMap.Pixel(-26, -13), //调整图片偏移
                    autoRotation: true, //自动旋转
                    angle: -90 //图片旋转角度
                });
            },


            //初始化轨迹
            initroad() {
                // 绘制轨迹
                this.polyline = new AMap.Polyline({
                    map: this.map,
                    path: this.lineArr,
                    showDir: true,
                    strokeColor: "#28F", //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6 //线宽
                    // strokeStyle: "solid"  //线样式
                });
                //绘制路过了的轨迹
                var passedPolyline = new AMap.Polyline({
                    map: this.map,
                    strokeColor: "#AF5", //线颜色
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
                    passedPolyline.setPath(e.passedPath);
                });
                this.map.setFitView(); //合适的视口
            },

            startAnimation() {
                this.marker.stopMove();
                this.speedCount = 1;
                this.markerSpeed = 200;
                if (this.lineArr.length < this.newLineArr.length) {
                    this.lineArr = this.newLineArr;//搞一个和之前数组一样的代码
                    this.initroad();
                    this.marker.moveAlong(this.lineArr, this.markerSpeed);
                } else {
                    this.marker.moveAlong(this.lineArr, this.markerSpeed);
                }
            },

            pauseAnimation() {
                this.marker.pauseMove();
            },
            resumeAnimation() {
                this.marker.resumeMove();
            },
            stopAnimation() {
                this.marker.stopMove();
            },

            //加速
            startAdd() {
                //点击加速将已经运动的点的颜色改成和之前的一样
                this.polyline = new AMap.Polyline({
                    map: this.map,
                    path: this.havePassedLine,
                    showDir: true,
                    strokeColor: "#AF5", //线颜色--绿色的线
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6 //线宽
                    // strokeStyle: "solid"  //线样式
                });
                //截取未运动的点
                if (this.passedLineLength >= 2) {
                    this.NoPassedLine = this.lineArr.slice(this.passedLineLength - 2);
                }
                //将未运动的点变成新的点
                this.lineArr = this.NoPassedLine;
                // 绘制轨迹---未运动时候的样式
                this.newPolyline = new AMap.Polyline({
                    map: this.map,
                    path: this.NoPassedLine,
                    showDir: true,
                    strokeColor: "#28F", //线颜色--蓝色的线
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, //线宽
                    strokeStyle: "solid" //线样式
                });
                //绘制运动过了的轨迹
                var newPassedPolyline = new AMap.Polyline({
                    map: this.map,
                    strokeColor: "#AF5", //线颜色--绿色的线
                    // path: this.lineArr,
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, //线宽
                    strokeStyle: "solid" //线样式
                });
                this.marker.on("moving", e => {
                    this.passedLineLength = e.passedPath.length;
                    this.havePassedLine = e.passedPath;
                    newPassedPolyline.setPath(e.passedPath);
                });
                this.map.setFitView(); //合适的视口
                if (this.markerSpeed < 1000) {
                    this.markerSpeed = 200;
                    this.speedCount++;
                    this.speedCount = this.speedCount++;
                    this.markerSpeed = this.markerSpeed * this.speedCount;
                    this.marker.moveAlong(this.NoPassedLine, this.markerSpeed);
                } else {
                    this.speedCount = 5;
                }
            },
//减速
            startRed() {
                //点击加速将已经运动的点的颜色改成和之前的一样
                this.polyline = new AMap.Polyline({
                    map: this.map,
                    path: this.havePassedLine,
                    showDir: true,
                    strokeColor: "#AF5", //线颜色--绿色的线
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6 //线宽
                    // strokeStyle: "solid"  //线样式
                });
                //截取未运动的点
                if (this.passedLineLength >= 2) {
                    this.NoPassedLine = this.lineArr.slice(this.passedLineLength - 2);
                }
                //将未运动的点变成新的点
                this.lineArr = this.NoPassedLine;
                // 绘制轨迹---未运动时候的样式
                this.newPolyline = new AMap.Polyline({
                    map: this.map,
                    path: this.NoPassedLine,
                    showDir: true,
                    strokeColor: "#28F", //线颜色--蓝色的线
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, //线宽
                    strokeStyle: "solid" //线样式
                });
                //绘制运动过了的轨迹
                var newPassedPolyline = new AMap.Polyline({
                    map: this.map,
                    strokeColor: "#AF5", //线颜色--绿色的线
                    // path: this.lineArr,
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, //线宽
                    strokeStyle: "solid" //线样式
                });
                this.marker.on("moving", e => {
                    this.passedLineLength = e.passedPath.length;
                    this.havePassedLine = e.passedPath;
                    newPassedPolyline.setPath(e.passedPath);
                });
                this.map.setFitView(); //合适的视口
                if (this.markerSpeed > 200) {
                    this.markerSpeed = 200;
                    this.speedCount--;
                    this.speedCount = this.speedCount--;
                    this.markerSpeed = this.markerSpeed * this.speedCount;
                    this.marker.moveAlong(this.NoPassedLine, this.markerSpeed);
                } else {
                    this.marker.moveAlong(this.NoPassedLine, 200);
                    this.speedCount = 1;
                }
            }


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #container {
        width:900px;
        height: 400px;
    }
</style>

