<template>
  <div v-show="!login" class="home">
    <el-row>
      <el-col :span="12" :class="{ closeOpen1: daohang }">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <div class="log">通用管理</div>
          <el-submenu
            index="1"
            @mouseover.native="mouseover('p')"
            @mouseleave.native="mouseleave('p')"
            class="line"
            :class="{ lineColor: p }"
          >
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>人员列表</span>
            </template>
            <el-menu-item-group>
              <router-link active-class="active" to="/PersonList"
                ><el-menu-item index="1-1"
                  >人员信息查看</el-menu-item
                ></router-link
              >
              <router-link active-class="active" to="/PersonnelDistribution"
                ><el-menu-item index="1-2"
                  >查看人员分布地区</el-menu-item
                ></router-link
              >
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="2"
            class="line"
            @mouseover.native="mouseover('p1')"
            @mouseleave.native="mouseleave('p1')"
            :class="{ lineColor: p1 }"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
          </el-submenu>
          <el-submenu
            index="4"
            class="line"
            @mouseover.native="mouseover('p2')"
            @mouseleave.native="mouseleave('p2')"
            :class="{ lineColor: p2 }"
          >
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-col>
      <div class="zujianShow">
        <div class="header">
          <div class="header-left">
            <span
              class="el-icon-s-fold qiehuan"
              @click="closeOpen"
              :class="{ xiansi: !xiansi }"
              title="关闭导航"
            ></span>
            <span
              class="el-icon-s-unfold qiehuan"
              @click="closeOpen"
              :class="{ xiansi: xiansi }"
              title="打开导航"
            ></span>
          </div>
          <div class="header-right" @mouseover="set" @mouseleave="set1">
            <span
              ><img
                src="./images/log.jpg"
                alt=""
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  vertical-align: middle;
                "
              />&nbsp;{{ name }}
            </span>
            <div class="userset" v-show="x">
              <ul>
                <li @click="dialogVisible = true">个人中心</li>
                <li>
                  <el-button type="text" @click="open">修改密码</el-button>
                </li>
                <li style="border-top: 1px solid gray" @click="tuichu">退出</li>
              </ul>
            </div>
          </div>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
        <div class="body">
          &nbsp;
          <!-- 指定组件的呈现位置 -->
          <router-view></router-view>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      // 用户名
      name: "",
      drawer: false,
      p: false,
      p1: false,
      p2: false,
      // 导航开关
      daohang: false,
      xiansi: true,
      // 用户设置
      x: false,
      dialogVisible: false,
    };
  },
  computed: {
    // 主页关闭，显示登录页
    login: {
      get() {
        return this.$store.state.a.logins;
      },
      set(value) {
        this.$store.dispatch("a/change", !value);
      },
    },
  },
  methods: {
    mouseover(e) {
      if (e === "p") {
        this.p = true;
      } else if (e === "p1") {
        this.p1 = true;
      } else {
        this.p2 = true;
      }
    },
    mouseleave(e) {
      if (e === "p") {
        this.p = false;
      } else if (e === "p1") {
        this.p1 = false;
      } else {
        this.p2 = false;
      }
    },
    closeOpen() {
      this.daohang = !this.daohang;
      this.xiansi = !this.xiansi;
    },
    set() {
      this.x = true;
    },
    set1() {
      this.x = false;
    },
    tuichu() {
      this.login = !this.login;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    open() {
      this.$prompt("密码格式为数字", "请输入新的密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: "密码格式不正确",
      })
        .then(({ value }) => {
          if (value.length > 0) 
            this.$message({
              type: "success",
              message: "你的密码是: " + value,
            });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  mounted() {
    axios.get("/api/mews").then(
      (response) => {
        this.name = response.data.userName;
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );
  },
};
</script>

<style scoped lang="less">
.home {
  height: 100%;
}
.log,
.el-menu {
  width: 30%;
  background-color: rgb(225, 225, 225, 0.7);
}
.el-row {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.el-col {
  width: 20%;
  height: 100%;
  transition: all 0.3s;
}
.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
}
.log {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: 600;
  font-size: 28px;
  font-family: "黑体";
  color: #8c888b;
  background: -webkit-linear-gradient(
    45deg,
    #70f7fe,
    #fbd7c6,
    #fdefac,
    #bfb5dd,
    #bed5f5
  );
}
.lineColor {
  transition: all 0.1s ease-out;
}
.zujianShow {
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 8%;
    background-color: #ffffff;
    .qiehuan {
      margin: 16px;
    }
    .qiehuan::before {
      width: 20px;
      height: 20px;
      font-size: 20px;
    }
    .header-right {
      margin-right: 12px;
      height: 52px;
      display: flex;
      align-items: center;
    }
  }
  .body {
    width: 100%;
    height: 92%;
  }
}
.xiansi {
  display: none;
}
// 开关导航
.closeOpen1 {
  background-color: #f5f7f9;
  width: 66px;
  background-color: pink;
  transition: all 0.3s;
  color: transparent;
  pointer-events: none;
  .xiansi {
    display: block;
  }
  .log {
    color: transparent;
  }
  /deep/.el-submenu__title span {
    display: none;
  }
  /deep/.el-icon-arrow-down {
    display: none;
  }
  /deep/.el-menu-item-group {
    display: none;
  }
}
.userset {
  position: relative;

  ul {
    position: absolute;
    top: 26px;
    right: -5px;
    width: 66px;
    border: 1px solid gray;
    list-style: none;
    font-size: 14px;
    text-align: center;
    line-height: 160%;
  }
  ul:hover {
    cursor: pointer;
  }
}
</style>