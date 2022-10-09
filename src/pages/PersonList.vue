<template>
  <div class="personList">
    <div class="operation">
      <div class="chaozuo">
        <span class="add el-icon-plus" type="text" @click="dialog = true"
          >添加</span
        >
        <span class="delete el-icon-delete" @click="revomveUsers">
          <!--  @click="toggleSelection()" :disabled="userIds.length === 0"  //这里是当里面的id为空，那么他就不能被选中-->
          删除</span
        >
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
      <el-table-column
        type="selection"
        width="55"
        ref="check"
      ></el-table-column>
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
            ><input type="number" :value="phone" ref="input1"
          /></el-descriptions-item>
          <el-descriptions-item label="现居住地">{{
            nowaddress
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">
            <el-tag size="small">{{ sex }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label="联系地址"
            :contentStyle="{ 'text-align': 'left' }"
            ><input
              type="text"
              :value="address"
              ref="input2"
              style="width: 100%"
          /></el-descriptions-item>
        </el-descriptions>
        <div class="save">
          <el-button @click="noSave">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
    <el-drawer
      title="添加人员"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <!-- status-icon -->
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item
            label="用户名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" clearable autofocus></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="form.gender" label="男" border>男</el-radio>
            <el-radio v-model="form.gender" label="女" border>女</el-radio>
          </el-form-item>
          <el-form-item
            label="地址"
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input v-model="form.address" clearable></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="phone"
          >
          <!-- onkeydown="value=value.replace(/^[0-9]*$/g,' ')" -->
            <el-input v-model="form.phone" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="
              $refs.drawer.closeDrawer();
              submitForm('form');
            "
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PersonList",
  data() {
    // 验证表单
    const Date = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择日期"));
      }
    };
    const Shuru = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }else
      //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
      if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
        this.verificationFailed=false
               return callback(new Error("请输入中文名称"));
             
              } else {
                //校验通过
                this.verificationFailed=true
                callback();
              }
    };
  const Shuru1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入地址"));
      }
    };
    const Shuru2 = (rule, value, callback) => {
       if (!value) {
        return callback(new Error("请输入手机号"));
      }else
      //校验手机的正则：/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/
      if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value) == false) {
        this.verificationFailed1=false
               return callback(new Error("请输入正确的手机号"));
              } else {
                //校验通过
                this.verificationFailed1=true
                callback();
              }
    };
    return {
      currentPage: 1, //当前页 刷新后默认显示第一页
      pageSize: 6, //每一页显示的数据量 此处每页显示6条数据
      // 模拟数据
      tableData: [],
      userIds: [], //用来删除
      //用户信息
      name: "",
      phone: "",
      address: "",
      nowaddress: "",
      sex: "",
      userinfo: false,
      num: "",
      // 判断验证失败用
      verificationFailed:true,
      verificationFailed1:true,
      // 添加表单
      table: false,
      dialog: false,
      loading: false,
      form: {
        id: "",
        date: "",
        name: "",
        gender: "男",
        address: "",
        nowaddress: "",
        phone: "",
      },
      formLabelWidth: "80px",
      timer: null,
      // 验证表单
      rules: {
        date: [{ validator: Date, trigger: "blur" }],
        name: [{ validator: Shuru, trigger: "blur" }],
        address: [{ validator: Shuru1, trigger: "blur" }],
        phone: [{ validator: Shuru2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.userIds = selection;
    },
    handleEdit(index, row) {
      // 编辑
      this.userinfo = !this.userinfo;
      this.name = row.name;
      this.phone = row.phone;
      this.address = row.address;
      this.nowaddress = row.nowaddress;
      this.sex = row.gender;
      this.num = index;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleDelete(index, row) {
      // 删除
      // console.log(index);
      this.tableData.splice(index, 1);
    },
    //点击按钮切换页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //每次点击分页按钮，当前页发生变化
      // console.log(this.currentPage);
    },
    noSave() {
      this.userinfo = !this.userinfo;
    },
    save() {
      this.userinfo = !this.userinfo;
      this.tableData[this.num].name = this.$refs.input.value;
      this.tableData[this.num].phone = this.$refs.input1.value;
      this.tableData[this.num].address = this.$refs.input2.value;
    },
    revomveUsers() {
      this.tableData = this.tableData.filter(
        (item) => !this.userIds.some((ele) => ele.id === item.id)
      );
      // console.log(this.tableData);
      this.$refs.multipleTable.clearSelection();
    },
    // 添加表单
    handleClose(done) {
      if(this.verificationFailed&&this.verificationFailed1){
        if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          if (
            this.form.date !== "" &&
            this.form.name !== "" &&
            this.form.gender !== "" &&
            this.form.address !== "" &&
            this.form.phone !== ""
          ) {
            this.loading = true;
            axios.get("/api/mews").then(
                (response) => {
                  this.form.id = response.data.ids.id;
                  this.form.nowaddress = response.data.ids.nowaddress;
                },
                (error) => {
                  console.log("请求失败了", error.message);
                }
              );
            this.timer = setTimeout(() => {
              this.tableData.unshift({
                id: this.form.id,
                date: this.form.date,
                name: this.form.name,
                nowaddress: this.form.nowaddress,
                gender: this.form.gender,
                address: this.form.address,
                phone: this.form.phone,
              });
              this.form.date = "";
              this.form.name = "";
              this.form.gender = "男";
              this.form.address = "";
              this.form.phone = "";
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          } else {
            alert('输入不能为空')
          }
        })
        .catch((_) => {});
      }else {
        alert('输入错误')
      }
      
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    // 验证表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  .save {
    display: flex;
    justify-content: end;
    background-color: #ffffff;
    .el-button {
      margin: 10px;
    }
  }
}
// 表单
.el-form-item {
  width: 400px;
}
/deep/.el-dialog__close {
  display: none;
}
/deep/.demo-drawer__footer {
  display: flex;
  justify-content: end;
  margin-right: 30px;
}

</style>