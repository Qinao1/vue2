<template>
  <div class="personList">
    <div class="operation">
      <div class="chaozuo">
        <span class="add el-icon-plus">添加</span
        ><span class="delete el-icon-delete">删除</span>
      </div>
      <div class="search el-icon-search">搜索</div>
    </div>
    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="gender" label="性别" width="120">
      </el-table-column>
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
    <div class="zezhaocheng" v-show="userinfo">
      <div class="edit">
        <el-descriptions
          title="用户信息编辑"
          style="background-color: #ffffff"
          :column="3"
          border
        >
          <el-descriptions-item
            label="用户名"
            label-class-name="my-label"
            content-class-name="my-content"
            ><input type="text" :value="name" ref="input"
          /></el-descriptions-item>
          <el-descriptions-item label="手机号"
            ><input type="number" :value="phone"  ref="input1"
          /></el-descriptions-item>
          <el-descriptions-item label="现居住地"
            >{{nowaddress}}</el-descriptions-item>
          <el-descriptions-item label="性别">
            <el-tag size="small">{{ sex }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label="联系地址"
            :contentStyle="{ 'text-align': 'left' }"
            ><input type="text" :value="address" ref="input2" style="width: 100%;"
          /></el-descriptions-item
          >
        </el-descriptions>
        <div class="save"><el-button @click="noSave">取消</el-button>
  <el-button type="primary" @click="save">保存</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PersonList",
  data() {
    return {
      currentPage: 1, //当前页 刷新后默认显示第一页
      pageSize: 6, //每一页显示的数据量 此处每页显示6条数据
      // 模拟数据
      tableData: [],
      multipleSelection: [], //用来删除
      //用户信息
      name: "",
      phone: "",
      address: "",
      nowaddress: "",
      sex: "",
      userinfo: false,
      num:'',
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
      this.userinfo = !this.userinfo;
      this.name = row.name;
      this.phone = row.phone;
      this.address = row.address;
      this.nowaddress = row.nowaddress;
      this.sex = row.gender;
      this.num=index
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
      
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
    noSave(){
      this.userinfo=!this.userinfo
    },
    save(){
      this.userinfo=!this.userinfo
      this.tableData[this.num].name=this.$refs.input.value
      this.tableData[this.num].phone=this.$refs.input1.value
      this.tableData[this.num].address=this.$refs.input2.value
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
.operation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 40px;
  margin-left: 20px;
  background-color: #ffffff;
  .chaozuo {
    span {
      display: inline-block;
      background-color: rgb(64, 158, 255);
      height: 30px;
      width: 60px;
      margin-left: 5px;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      border-radius: 5px;
      letter-spacing: 2px;
    }
    .delete {
      background-color: rgb(252, 118, 76);
    }
  }
  .search {
    height: 30px;
    width: 60px;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    border-radius: 5px;
    background-color: rgb(64, 158, 255);
    letter-spacing: 2px;
    margin-right: 5px;
  }
}
.el-table {
  width: 1000px;
  margin-left: 20px;
  height: 367px;
  text-align: center;
}
.el-pagination {
  width: 990px;
  margin-left: 20px;
  margin-top: 10px;
}
// 遮罩层
.zezhaocheng {
  width: 65%;
  height: 57%;
  position: fixed;
  top: 95px;
  left: 360px;
  box-shadow: 98px 100px 500px rgba(0, 0, 0, 0.11);
}
// 编辑部分样式
.edit {
  width: 650px;
  margin-left: 20px;
  position: absolute;
  box-shadow: 3px 0px 40px rgba(0, 0, 0, 0.35);

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
  }
  input[type="number"] {
    appearance: textfield;
  }
  .save{
    display: flex;
    justify-content: end;
    background-color: #ffffff;
    .el-button{
      margin: 10px;
    }
  }
}
</style>