<template>
    <el-table
            :data="tableData"
            border
            style="width: 100%">
        <el-table-column
                prop="id"
                label="ID"
                width="120">
        </el-table-column>
        <el-table-column
                prop="start"
                label="出发点"
                width="120">
        </el-table-column>
        <el-table-column
                prop="destination"
                label="目的地"
                width="120">
        </el-table-column>

        <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>


<script>
    export default {
        name: "RouteTable",

        data() {
            return {
                tableData: [{
                    id: '1',
                    start: '北京',
                    destination: '上海',

                },  {
                    id: '2',
                    start: '新疆',
                    destination: '乌鲁木齐',
                }]
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            }
        }

    }
</script>

<style scoped>

</style>