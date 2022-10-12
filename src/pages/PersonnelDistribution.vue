<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: "PersonnelDistribution",
  data() {
    return {
      tableDataone: [],
    };
  },
  computed: {
    tableData1: {
      get() {
        return this.$store.state.b.tableData;
      },
    },
  },
  watch:{
    tableData1: {
      handler(newValue, oldValue) {
        this.tableDataone = newValue; 
      },
    },
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      // 修改echarts.init()为this.$echarts.init() [因为上面第二步，将echarts保存到全局变量$echarts中]
      let myChart = this.$echarts.init(document.getElementById("main"));
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
              { value: this.manone , name: "男" },
              { value: 235, name: "女" },
            ],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
    this.$store.dispatch("b/qingqiu");
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