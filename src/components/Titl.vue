<template>
  <div>
    <ul v-for="item in title" :key="item.id">
      <li>{{item.name}}</li>
    </ul>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "Titl",
  data() {
    return {
      title:''
    };
  },
  created() {
    axios.post("/api/mews").then(
      (response) => {
        console.log("请求成功了", response);
        this.title=response.data.title
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );
  },
};
</script>
  
  <style>
</style>