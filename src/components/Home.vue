<template>
  <!-- <div v-if="!login"> -->
  <div class="home" v-if="true">
    <el-row>
      <el-col :span="12" :class="{closeOpen1:daohang}">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <div class="log">后台通用管理</div>
          <el-submenu index="1" 
          @mouseover.native="mouseover('p')" 
          @mouseleave.native="mouseleave('p')"
          class="line"
          :class="{ lineColor: p }"
           >
            <template slot="title" >
              <i class="el-icon-s-home"></i>
              <span >人员列表</span>
            </template>
            <el-menu-item-group>
              <template slot="title" >人员分布</template>
              <el-menu-item index="1-1">人员信息查看</el-menu-item>
              <el-menu-item index="1-2">查看人员分布地区</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2" class="line"
          @mouseover.native="mouseover('p1')" 
          @mouseleave.native="mouseleave('p1')"
          :class="{ lineColor: p1 }">
          <template slot="title" >
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
            </template>
            
          </el-submenu>
          <el-submenu index="4" class="line" @mouseover.native="mouseover('p2')" 
          @mouseleave.native="mouseleave('p2')"
          :class="{ lineColor: p2 }">
          <template slot="title" >
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
            </template>
            
          </el-submenu>
        </el-menu>
      </el-col>
      <div class="zujianShow">
            <div class="header">
              <span class="el-icon-s-fold qiehuan" @click="closeOpen"></span>
            </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      p:false,
      p1:false,
      p2:false,
      // 导航开关
      daohang:false,
    };
  },
  computed: {
    // 登录页关闭后，显示主页
    login() {
      return this.$store.state.a.logins;
    },
  },
  methods: {
    mouseover(e){
      if(e==='p'){
        this.p=true
      }else if(e==='p1'){
        this.p1=true
      }else{
        this.p2=true
      }
    },
    mouseleave(e){
      if(e==='p'){
        this.p=false
      }else if(e==='p1'){
        this.p1=false
      }else{
        this.p2=false
      }
    },
    closeOpen(){
      this.daohang=!this.daohang
    }
  },
};
</script>

<style scoped lang="less">
.home{
    height: 100%;
  }
.log,
.el-menu {
  width: 30%;
  background-color: rgb(225, 225, 225, 0.7);
}
.el-row{
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.el-col{
  width: 20%;
  height: 100%;
  transition: all 0.3s;
}
.el-menu-vertical-demo{
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
.lineColor{
  transition: all 0.1s ease-out;
  margin-left: -2px;
}
.zujianShow{
  width: 100%;
  height: 100%;
  margin-left: 2px;
  .header{
    background-color: #ffffff;
    .qiehuan{
      margin: 16px;
    }
    .qiehuan::before{
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
  }
  
}
// 开关导航
.closeOpen1{
  background-color: #f5f7f9;
  width: 66px;
  background-color: pink;
  transition: all 0.3s ;
  color: transparent;
  .log {
    color: transparent;
  }
  /deep/.el-submenu__title span{
    display: none;
  }
  /deep/.el-icon-arrow-down{
    display: none;
  }
}
</style>