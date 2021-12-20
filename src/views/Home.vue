<template>
  <div class="home bg">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
   <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="text-center text-white textStyle">前端薪資調查表</div>
    <nav class="navbar navbar-light">
      <form class="container-fluid justify-content-center">
        <div class="px-2 py-2 rounded border">
          <button
            class="btn btn-sm btn-outline-light me-2 tabBtnColor"
            type="button"
            :class="{ tabBtnColorActive: activeBtn === 'baseData' }"
            @click="activeBtn = 'baseData'"
          >
            基本資料
          </button>
          <button
            class="btn btn-sm btn-outline-light tabBtnColor"
            type="button"
            :class="{ tabBtnColorActive: activeBtn === 'industry' }"
            @click="activeBtn = 'industry'"
          >
            薪資與產業
          </button>
        </div>
      </form>
    </nav>
    <div class="d-flex justify-content-center mt-3">
      <div class="row container">
        <div class="col-6 px-2" style="background-color: #28234c">
          <div class="cardBg">
            <!-- <template> -->
            <!-- <BarChart
              :chartData="customChartData"
              :options="options"
            ></BarChart> -->
            <div id="areaBar"></div>
            <!-- </template> -->
          </div>
        </div>
        <div class="col-6 px-2" style="background-color: #28234c">
          <div class="cardBg">
            <div id="ageBar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FrontendJson from "./jsonData/frontend_data.json";
// import "https://cdn.plot.ly/plotly-2.8.1.min.js";
// import { Bar } from "vue-chartjs";
// import BarChart from "../components/LineChart.vue";
// import Plotly from "plotly.js-dist-min";
import Plotly from "plotly.js/dist/plotly";
export default {
  name: "Home",
  components: {
    Plotly,
  },
  data() {
    return {
      activeBtn: "baseData",
      frontendJson: FrontendJson,
      uiJson: [],
      dataArea: {},
      dataSexual: {},
      dataAge: {},
      dataDepartment: {
        資訊科系相關: 0,
        非資訊科系相關: 0,
      },

      // customChartData: {
      //   labels: ["資訊科系相關", "非資訊科系相關"],
      //   datasets: [
      //     {
      //       label: "GitHub Commits",
      //       backgroundColor: "#f87979",
      //       data: [163, 289],
      //     },
      //   ],
      // },
      // options: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   title: {
      //     display: true,
      //     text: "My Data",
      //   },
      // },
    };
  },
  methods: {
    areaChartFn() {
      console.log(this.dataArea);
      const areadata = Object.entries(this.dataArea);
      console.log(areadata);
      let area = [];
      let areapersonnum = [];
      for (let i = 0; areadata.length > i; i++) {
        area.push(areadata[i][0]);
        areapersonnum.push(areadata[i][1]);
      }
      const areaData = [
        {
          x: area,
          y: areapersonnum,
          type: "bar",
        },
      ];
      Plotly.newPlot("areaBar", areaData);
    },
    agePlotlyFn() {
      const agedata = Object.entries(this.dataAge);
      let age = [];
      let agetitle = [];
      for (let i = 0; agedata.length > i; i++) {
        age.push(agedata[i][1]);
        agetitle.push(agedata[i][0]);
      }
      const data = [
        {
          x: agetitle,
          y: age,
          type: "bar",
        },
      ];
      Plotly.newPlot("ageBar", data);
    },
  },
  mounted() {
    for (let i = 0; this.frontendJson.length > i; i++) {
      if (!this.dataArea[this.frontendJson[i].company.area]) {
        this.dataArea[this.frontendJson[i].company.area] = 1;
      } else {
        this.dataArea[this.frontendJson[i].company.area]++;
      }
      if (!this.dataSexual[this.frontendJson[i].gender]) {
        this.dataSexual[this.frontendJson[i].gender] = 1;
      } else {
        this.dataSexual[this.frontendJson[i].gender]++;
      }
      if (!this.dataAge[this.frontendJson[i].age]) {
        this.dataAge[this.frontendJson[i].age] = 1;
      } else {
        this.dataAge[this.frontendJson[i].age]++;
      }
      let noneInfoGroup = this.frontendJson[i].major.indexOf("資訊科系相關");
      if (noneInfoGroup !== -1) {
        this.dataDepartment["資訊科系相關"]++;
      }

      // let areaIndexOf = area.indexOf(this.frontendJson[i].company.area);
      // // area.push(this.frontendJson[i].company.area);
      // if (areaIndexOf === -1) {
      //   area.push(this.frontendJson[i].company.area);
      // };
    }
    this.dataDepartment["非資訊科系相關"] =
      Number(this.frontendJson.length) -
      Number(this.dataDepartment["資訊科系相關"]);
    // console.log(this.dataDepartment);
    this.areaChartFn();
    this.agePlotlyFn();
  },
};
</script>
<style lang="scss">
.textStyle {
  font-size: 32px;
  font-weight: 700;
}
</style>
