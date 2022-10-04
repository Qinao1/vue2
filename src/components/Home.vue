<template>
  <div v-if="!login">
    <h2>管理页</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  computed:{
    // 登录页关闭后，显示主页
    login(){
      return this.$store.state.a.logins
    }
  },
  methods:{
    
  }
};
</script>

<style scoped lang="less">
  h2{
    background-color: pink;
  }
</style>