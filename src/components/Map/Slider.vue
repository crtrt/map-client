<template>
    <div class="control">
        <!--        进度条-->
        <el-row :gutter="20">
            <el-slider
                    v-model="mapSpeed"
                    show-input
                    show-stops
                    :max="10">
            </el-slider>
        </el-row>


        <el-row :gutter="20">

            <el-col :span="4">
                <span>总里程：{{distance}}km</span>
            </el-col>
            <el-col :span="4">
                <span>总时间：{{time}}h</span>
            </el-col>

            <el-col :span="4">
                <el-button  @click="start"  type="info">开始</el-button>
            </el-col>
            <el-col :span="4">
                <el-button  @click="pause"  type="info">暂停</el-button>
            </el-col>
            <el-col :span="4">
                <el-button  @click="resume"  type="info">继续</el-button>
            </el-col>
            <el-col :span="4">
                <el-button @click="stop"  type="info">停止</el-button>
            </el-col>

            <!--        速度条-->
            <el-col :gutter="20">
                <el-slider
                        v-model="mapSpeed"
                        show-input
                        show-stops
                        :max="10">
                </el-slider>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Slider",
        data(){
            return {
                mapSpeed: 100,
                distance:1000,
                time:20,
            }

        },
        methods:{
            start(){
                marker.moveAlong(lineArr, 200);
            },

            pause(){
                marker.pauseMove();
            },

            resume () {
                marker.resumeMove();
            },

            stop () {
                marker.stopMove();
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }

</style>
