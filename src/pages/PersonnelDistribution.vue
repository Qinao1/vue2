<template>
  <div>
    <div id="main" ref="maina"></div>
  </div>
</template>

<script>

export default {
  name: "PersonnelDistribution",
  data() {
    return {
      manNumber:'',
      womanNumber:''
    };
  },
  computed: {
		man(){
       this.manNumber= this.$store.getters['b/man']
       return this.$store.getters['b/man']
    },
    woman(){
      this.womanNumber= this.$store.getters['b/woman']
       return this.$store.getters['b/woman']
    }
  },
  watch:{
    man:{
      handler(newValue,oldValue){
            this.manNumber=newValue
            this.echarts()
            
      }
    },
    woman:{
      handler(newValue,oldValue){
            this.womanNumber=newValue
            this.echarts()
      }
    }
  },
  methods: {
    echarts() {
      // 基于准备好的dom，初始化echarts实例
      // 修改echarts.init()为this.$echarts.init() [因为上面第二步，将echarts保存到全局变量$echarts中]
      let chart = this.$echarts.init(this.$refs.maina);
      if (chart== null) { // 如果不存在，就进行初始化。
    	chart= echarts.init(document.getElementById(main));
    }
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "性别",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.manNumber , name: "男" },
              { value: this.womanNumber, name: "女" },
            ],
          },
        ],
      };
    
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option,true);
    },
  },
  mounted() {
      this.echarts();
      console.log(this.manNumber);
  },

};
</script>

<style scoped lang="less">
#main {
  width: 400px;
  height: 300px;
  margin-left: -50px;
}
</style>