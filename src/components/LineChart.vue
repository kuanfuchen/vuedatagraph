<script>
import { Bar } from "vue-chartjs";
// const { reactiveProp } = mixins;

export default {
  // name: "barchart",
  extends: Bar,
  // mixins: [reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    // this.chartData 在 mixin 创建.
    // 如果你需要替换 options , 请创建本地的 options 对象
    this.renderChart(this.chartData, this.options);
  },
};
</script>