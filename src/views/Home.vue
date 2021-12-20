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
            @click="baseDataPlotFn()"
          >
            基本資料
          </button>
          <button
            class="btn btn-sm btn-outline-light tabBtnColor"
            type="button"
            :class="{ tabBtnColorActive: activeBtn === 'industry' }"
            @click="industryPlotFn()"
          >
            薪資與產業
          </button>
        </div>
      </form>
    </nav>
    <div class="d-flex justify-content-center mt-3">
      <div class="row container" v-if="activeBtn === 'baseData'">
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
        <div class="col-4 px-2 mt-3" style="background-color: #28234c">
          <div class="cardBg">
            <div id="sexPie"></div>
          </div>
        </div>
        <div class="col-8 px-2 mt-3" style="background-color: #28234c">
          <div class="cardBg">
            <div id="departmentBar"></div>
          </div>
        </div>
      </div>
      <div class="row container" v-if="activeBtn === 'industry'">
        <div class="col-6 px-2" style="background-color: #28234c">
          <div class="cardBg">
            <!-- <template> -->
            <!-- <BarChart
              :chartData="customChartData"
              :options="options"
            ></BarChart> -->
            <div></div>
            <!-- </template> -->
          </div>
        </div>
        <div class="col-12 px-2" style="background-color: #28234c">
          <div class="cardBg">
            <div id="yearseniority"></div>
          </div>
        </div>
        <div class="col-12 px-2 mt-3" style="background-color: #28234c">
          <div class="cardBg">
            <div id="yearsalary"></div>
          </div>
        </div>
        <div class="col-12 px-2 mt-3" style="background-color: #28234c">
          <div class="cardBg">
            <div id="companyindustry"></div>
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
      yearSeniority: [],
      salary: {},
      companyIndustry: {},
    };
  },
  methods: {
    baseDataPlotFn() {
      this.activeBtn = "baseData";
      setTimeout(() => {
        this.areaChartFn();
        this.agePlotlyFn();
        this.sexPlotFn();
        this.departmentFn();
      }, 1000);
    },
    industryPlotFn() {
      this.activeBtn = "industry";
      setTimeout(() => {
        this.seniorityFn();
        this.salaryFn();
        this.industryFn();
      }, 1000);
    },
    areaChartFn() {
      const areadata = Object.entries(this.dataArea);
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
      Plotly.newPlot("areaBar", areaData, { title: "地區" });
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
      Plotly.newPlot("ageBar", data, { title: "年齡" });
    },
    sexPlotFn() {
      const sexualData = Object.entries(this.dataSexual);
      let sexName = [];
      let sexNum = [];
      for (let i = 0; sexualData.length > i; i++) {
        sexName.push(sexualData[i][0]);
        sexNum.push(sexualData[i][1]);
      }
      const data = [
        {
          labels: sexName,
          values: sexNum,
          type: "pie",
        },
      ];
      Plotly.newPlot("sexPie", data, { title: "性別" });
    },
    departmentFn() {
      const department = Object.entries(this.dataDepartment);
      let departNum = [];
      let departName = [];
      for (let i = 0; department.length > i; i++) {
        departName.push(department[i][0]);
        departNum.push(department[i][1]);
      }
      const data = [
        {
          y: departNum,
          x: departName,
          type: "bar",
        },
      ];
      Plotly.newPlot("departmentBar", data, { title: "學歷與科系" });
    },
    seniorityFn() {
      // this.yearSeniority
      let yearTitle = [];
      let yearNum = [];
      for (let i = 0; this.yearSeniority.length > i; i++) {
        yearTitle.push(this.yearSeniority[i][0]);
        yearNum.push(this.yearSeniority[i][1]);
      }
      const data = [
        {
          x: yearTitle,
          y: yearNum,
          type: "bar",
        },
      ];
      Plotly.newPlot("yearseniority", data, { title: "年資" });
    },
    salaryFn() {
      const salaryObj = Object.entries(this.salary);
      let salaryNum = [];
      let salaryTitle = [];
      for (let i = 0; salaryObj.length > i; i++) {
        salaryNum.push(salaryObj[i][1]);
        salaryTitle.push(salaryObj[i][0]);
      }
      const data = [
        {
          x: salaryTitle,
          y: salaryNum,
          type: "bar",
        },
      ];
      Plotly.newPlot("yearsalary", data, { title: "年薪" });
    },
    industryFn() {
      const industryObj = Object.entries(this.companyIndustry);
      let industryNum = [];
      let industryTitle = [];
      for (let i = 0; industryObj.length > i; i++) {
        industryNum.push(industryObj[i][1]);
        industryTitle.push(industryObj[i][0]);
      }

      const data = [
        {
          labels: industryTitle,
          values: industryNum,
          type: "pie",
          textinfo: "none",
        },
      ];
      Plotly.newPlot("companyindustry", data, { title: "產業分布" });
    },
  },

  mounted() {
    console.log(this.frontendJson);
    let jobTenure = [];
    let salary = [];
    let industry = [];
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
      // console.log(this.frontendJson[i].company.job_tenure);
      if (!jobTenure[this.frontendJson[i].company.job_tenure]) {
        jobTenure[this.frontendJson[i].company.job_tenure] = 1;
      } else {
        jobTenure[this.frontendJson[i].company.job_tenure]++;
      }
      if (!salary[this.frontendJson[i].company.salary]) {
        salary[this.frontendJson[i].company.salary] = 1;
      } else {
        salary[this.frontendJson[i].company.salary]++;
      }
      if (!industry[this.frontendJson[i].company.industry]) {
        industry[this.frontendJson[i].company.industry] = 1;
      } else {
        industry[this.frontendJson[i].company.industry]++;
      }
    }
    const yearSeniority = Object.entries(jobTenure);
    for (let i = 0; yearSeniority.length > i; i++) {
      if (yearSeniority[i][0] !== "") {
        this.yearSeniority.push(yearSeniority[i]);
      }
    }
    this.salary = salary;
    this.companyIndustry = industry;
    console.log(this.companyIndustry);
    console.log(this.yearSeniority);
    console.log(salary);
    this.dataDepartment["非資訊科系相關"] =
      Number(this.frontendJson.length) -
      Number(this.dataDepartment["資訊科系相關"]);
    // console.log(this.dataDepartment);
    this.areaChartFn();
    this.agePlotlyFn();
    this.sexPlotFn();
    this.departmentFn();
  },
};
</script>
<style lang="scss">
.textStyle {
  font-size: 32px;
  font-weight: 700;
}
</style>
