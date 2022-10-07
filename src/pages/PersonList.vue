<template>
  <div class="personList">
    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phone" label="手机" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next,jumper, ->, total"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      style="text-align: center"
    >
    </el-pagination>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PersonList",
  data() {
    return {
        size: '',
      currentPage: 1, //当前页 刷新后默认显示第一页
      pageSize: 6, //每一页显示的数据量 此处每页显示6条数据
      // 模拟数据
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
        // 编辑
      console.log(row.name);
    },
    handleDelete(index, row) {
        // 删除
      this.tableData.splice(index, 1);
    },
    //点击按钮切换页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //每次点击分页按钮，当前页发生变化
      // console.log(this.currentPage);
    },
  },
  mounted() {
    axios.get("/api/mews").then(
      (response) => {
        this.tableData = response.data.title;
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );
  },
};
</script>

<style scoped lang="less">
// .personList {
//   margin-top: 20px;
// }
.el-table {
    width: 1000px;
  margin-left: 20px;
  margin-top: 20px;
  height: 367px;
  text-align: center;
}
</style>