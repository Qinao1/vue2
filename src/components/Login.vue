<template>
  <div class="logi" v-if="n">
    <!-- 登录部分 -->
    <form action="" class="form1" v-show="login">
      <p>用户登录</p>
      账号
      <el-input
        placeholder="请输入用户名"
        @keydown.enter.native="next"
        v-model="userName"
        clearable
      >
      </el-input>
      密码
      <el-input
        ref="password"
        @keydown.enter.native="denglu1"
        placeholder="请输入密码"
        v-model="userPassword"
        show-password
      ></el-input>
      <span>忘记密码？</span>
      <div class="login_sign">
        <span @click="denglu1">{{ denglu }}</span>
        <span @click="zuce">注册</span>
      </div>
    </form>
    <!-- 注册部分 -->
    <form action="" class="form2" v-show="!login">
      <p>注册</p>
      账号
      <el-input
        placeholder="请输入用户名"
        v-model="usernameSign"
        clearable
        @keydown.enter.native="next1"
      >
      </el-input>
      密码
      <el-input
        ref="userpassWordSign"
        @keydown.enter.native="next2"
        placeholder="请输入密码"
        v-model="userpassWordSign"
        show-password
      ></el-input>
      确认密码
      <el-input
      @keydown.enter.native="successSign"
      ref="userpassWordAgain"
        placeholder="请再次输入密码"
        v-model="userpassWordAgain"
        show-password
      ></el-input>
      <div class="login_sign">
        <span @click="successSign">点击注册</span>
        <span @click="zuce">返回登录</span>
      </div>
    </form>
    <!-- 警告部分 -->
    <el-alert
      v-show="success"
      title="登录成功"
      type="success"
      show-icon
      :closable="false"
    >
    </el-alert>
    <el-alert
      v-show="passwordErr"
      title="用户名或密码错误!!"
      type="error"
      show-icon
    >
    </el-alert>
    <el-alert v-show="everyone" title="输入不能为空" type="error" show-icon>
    </el-alert>
    <el-alert
      v-show="successSigns"
      title="注册成功"
      type="success"
      show-icon
      :closable="false"
    ></el-alert>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      denglu: "登录",
      // 登录页
      userName: "",
      userPassword: "",
      //   注册页
      usernameSign: "",
      userpassWordSign: "",
      userpassWordAgain: "",
      successSigns: false,
      // 切换
      login: true,
      //警告部分
      success: false,
      passwordErr: false,
      everyone: false,
      // 切换组件
      n: true,
    };
  },
  methods: {
    zuce() {
      this.login = !this.login;
      this.userName = "";
      this.userPassword = "";
      this.usernameSign = "";
      this.userpassWordAgain = "";
      this.usernameSign = "";
    },
    denglu1() {
      if (this.userName !== "" || this.userPassword !== "") {
        axios.get("/api/mews").then(
          (response) => {
            if (
              this.userName === response.data.userName &&
              this.userPassword === response.data.passWord
            ) {
              this.denglu = "登录..";
              this.success = true;
              setTimeout(() => {
                this.$store.dispatch("a/change", this.n);
                this.n = this.$store.state.a.logins;
              }, 1000);
            } else if (this.userName === "" || this.userPassword === "") {
              this.everyone = true;
              setTimeout(() => {
                this.everyone = false;
              }, 2000);
            } else {
              this.passwordErr = true;
              setTimeout(() => {
                this.passwordErr = false;
              }, 1300);
            }
          },
          (error) => {
            console.log("请求失败了", error.message);
          }
        );
      } else {
        this.everyone = true;
        setTimeout(() => {
          this.everyone = false;
        }, 2000);
      }
    },
    // 登录页输入框
    next() {
      if (this.userName.length > 0) {
        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      } else {
        this.everyone = true;
        setTimeout(() => {
          this.everyone = false;
        }, 2000);
      }
    },
    // 注册页输入框
    next1() {
      if (this.usernameSign.length > 0) {
        this.$nextTick(() => {
          this.$refs.userpassWordSign.focus();
        });
      } else {
        this.everyone = true;
        setTimeout(() => {
          this.everyone = false;
        }, 2000);
      }
    },
    next2() {
      if (this.userpassWordSign.length > 0) {
        this.$nextTick(() => {
          this.$refs.userpassWordAgain.focus();
        });
      } else {
        this.everyone = true;
        setTimeout(() => {
          this.everyone = false;
        }, 2000);
      }
    },
    successSign() {
      if (
        this.usernameSign.length > 0 &&
        this.userpassWordSign.length > 0 &&
        this.userpassWordAgain.length > 0
      ) {
        this.successSigns = true;
        this.usernameSign = "";
        this.userpassWordSign = "";
        this.userpassWordAgain=""
         setTimeout(() => {
          this.successSigns = false;
        }, 1000);
      } else if(this.userpassWordSign !==this.userpassWordAgain){
alert('两次输入不一致')
      }else {
        this.everyone = true;
        setTimeout(() => {
          this.everyone = false;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.logi {
  height: 100%;
  width: 100%;
  background-size: cover;
  background: url("./images/log.jpg") no-repeat center fixed;
}
// 表单样式
.form1,
.form2 {
  width: 20%;
  height: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0 2%;
  transform: translate(-50%, -50%);
  background-color: rgba(225, 225, 225, 0.5);
  border-radius: 25px;
  font-size: 13px;
  color: #fff;
  p {
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 5px;
  }
  .el-input {
    margin: 5px;
    /deep/ .el-input__inner {
      width: 98%;
      height: 30px;
      padding: 0;
      color: #fff;
      border: 0px;
      border-radius: 0;
      border-bottom: 1px solid #fff;
      background-color: transparent;
    }
  }
  span {
    margin-top: 5px;
    display: flex;
    justify-content: end;
    font-size: 12px;
  }
  .login_sign {
    margin-top: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    text-align: center;
    span {
      display: inline;
      color: #fff;
      width: 60px;
      height: 20px;
      line-height: 20px;
      background-color: #a52a2a;
      text-align: center;
      border-radius: 5px;
      letter-spacing: 3px;
    }
  }
}
.form2,
.form1:hover {
  cursor: pointer;
}
.form2 {
  height: 280px;
  .login_sign {
    span {
      width: 26%;
      height: 25px;
      padding: 0;
      line-height: 25px;
      text-align: center;
      padding-right: 1px;
    }
  }
}
// 警告样式
.el-alert--success.is-light {
  width: 200px;
  position: absolute;
  top: 15%;
  left: 42%;
  /deep/ .el-alert__content {
    margin: 0 auto;
    .el-alert__title {
      text-align: center;
    }
  }
}
.el-alert--error {
  width: 300px;
  height: 70px;
  position: absolute;
  top: 25%;
  left: 39%;
}
</style>