<template>
  <div class="home bg">
    <div class="text-center text-white textStyle">UI設計薪資調查表</div>
    <nav class="navbar navbar-light">
      <form class="container-fluid justify-content-center">
        <div class="px-2 py-2 rounded border">
          <button
            class="btn btn-sm btn-outline-light me-2 tabBtnColor"
            type="button"
            :class="{ tabBtnColorActive: uiactiveBtn === 'baseData' }"
            @click="uiBaseDataPlotFn()"
          >
            基本資料
          </button>
          <button
            class="btn btn-sm btn-outline-light tabBtnColor"
            type="button"
            :class="{ tabBtnColorActive: uiactiveBtn === 'industry' }"
            @click="uiIndustryPlotFn()"
          >
            薪資與產業
          </button>
        </div>
      </form>
    </nav>
    <div class="d-flex justify-content-center">
      <div class="row container" v-if="uiactiveBtn === 'baseData'">
        <div
          class="col-md-6 col-12 px-2 mt-2"
          style="background-color: #28234c"
        >
          <div class="cardBg">
            <canvas
              id="areaCanvas"
              style="width: 300px; max-width: 800px; height: 300px"
            >
            </canvas>
          </div>
        </div>
        <div
          class="col-md-6 col-12 px-2 mt-2"
          style="background-color: #28234c"
        >
          <div class="cardBg">
            <canvas
              id="ageCanvas"
              style="width: 300px; max-width: 800px; height: 300px"
            >
            </canvas>
          </div>
        </div>
        <!--  -->
        <div
          class="col-md-6 col-12 px-2 mt-2"
          style="background-color: #28234c"
        >
          <div class="cardBg">
            <canvas
              id="sexualCanvas"
              class="py-3"
              style="width: 300px; max-width: 800px; height: 300px"
            >
            </canvas>
          </div>
        </div>
        <div
          class="col-md-6 col-12 px-2 mt-2"
          style="background-color: #28234c"
        >
          <div class="cardBg">
            <canvas
              id="departCanvas"
              style="width: 300px; max-width: 800px; height: 300px"
            >
            </canvas>
          </div>
        </div>
      </div>
      <div class="row container" v-if="uiactiveBtn === 'industry'">
        <div class="col-12 px-2 mt-2" style="background-color: #28234c">
          <div class="cardBg">
            <canvas id="seniorityCanvas" style="width: 300px; max-width: 800px">
            </canvas>
          </div>
        </div>
        <div class="col-12 px-2 mt-2" style="background-color: #28234c">
          <div class="cardBg">
            <canvas id="salaryCanvas" style="width: 300px; max-width: 800px">
            </canvas>
          </div>
        </div>
        <div class="col-12 px-2 mt-2" style="background-color: #28234c">
          <div class="cardBg">
            <canvas id="industryCanvas" style="width: 300px; max-width: 800px">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UIJson from "./jsonData/ui_data.json";
import Chart from "chart.js/dist/chart.js";
export default {
  name: "uiinterface",
  components: {
    Chart,
  },
  data() {
    return {
      uiactiveBtn: "industry",
      uiJson: UIJson,
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
      chartJsOption: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "地區",
          },
        },
      },
      chartJsBgColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 204, 86, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
    };
  },
  methods: {
    uiBaseDataPlotFn() {
      this.uiactiveBtn = "baseData";
      this.uiAreaPlotFn();
      this.uiAgePlotFn();
      this.uiSexualPlotFn();
      this.uiDepartPlotFn();
    },
    uiIndustryPlotFn() {
      this.uiactiveBtn = "industry";
      this.uiYearSeniorityPlotFn();
      this.uiSalaryFn();
      this.uiCompanyIndustryFn();
    },
    uiAreaPlotFn() {
      const vm = this;
      let arealabels = [];
      let areaData = [];
      return new Promise((resolve) => {
        resolve();
        const dataAreaObj = Object.entries(vm.dataArea);

        for (let i = 0; dataAreaObj.length > i; i++) {
          arealabels.push(dataAreaObj[i][0]);
          areaData.push(dataAreaObj[i][1]);
        }
      }).then(() => {
        new Chart("areaCanvas", {
          type: "bar",
          data: {
            labels: arealabels,
            datasets: [
              {
                data: areaData,
                backgroundColor: vm.chartJsBgColor,
              },
            ],
          },
          options: vm.chartJsOption,
        });
      });
    },
    uiAgePlotFn() {
      let ageLabels = [];
      let ageData = [];
      const vm = this;
      return new Promise((resolve) => {
        const dataAgeObj = Object.entries(vm.dataAge);
        resolve();
        for (let i = 0; dataAgeObj.length > i; i++) {
          ageLabels.push(dataAgeObj[i][0]);
          ageData.push(dataAgeObj[i][1]);
        }
      }).then(() => {
        new Chart("ageCanvas", {
          type: "bar",
          data: {
            labels: ageLabels,
            datasets: [
              {
                data: ageData,
                backgroundColor: vm.chartJsBgColor,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: "年齡",
              },
            },
          },
        });
      });
    },
    uiSexualPlotFn() {
      const sexualObj = Object.entries(this.dataSexual);
      let sexLabels = [];
      let sexData = [];
      const vm = this;
      return new Promise((resolve) => {
        resolve();
        for (let i = 0; sexualObj.length > i; i++) {
          sexLabels.push(sexualObj[i][0]);
          sexData.push(sexualObj[i][1]);
        }
      }).then(() => {
        new Chart("sexualCanvas", {
          type: "pie",
          data: {
            labels: sexLabels,
            datasets: [
              {
                data: sexData,
                backgroundColor: vm.chartJsBgColor,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true },
              title: {
                display: true,
                text: "性別",
              },
            },
          },
        });
      });
    },
    uiDepartPlotFn() {
      const dataDepartmentObj = Object.entries(this.dataDepartment);
      let departmentLabels = [];
      let departmentData = [];
      const vm = this;
      return new Promise((resolve) => {
        resolve();
        for (let i = 0; dataDepartmentObj.length > i; i++) {
          departmentLabels.push(dataDepartmentObj[i][0]);
          departmentData.push(dataDepartmentObj[i][1]);
        }
      }).then(() => {
        new Chart("departCanvas", {
          type: "bar",
          data: {
            labels: departmentLabels,
            datasets: [
              {
                data: departmentData,
                backgroundColor: vm.chartJsBgColor,
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: "學歷與科系",
              },
            },
          },
        });
      });
    },
    uiYearSeniorityPlotFn() {
      let yearSeniorityLabels = [];
      let yearSeniorityData = [];
      const vm = this;
      return new Promise((resolve) => {
        resolve();
        for (let i = 0; this.yearSeniority.length > i; i++) {
          yearSeniorityLabels.push(this.yearSeniority[i][0]);
          yearSeniorityData.push(this.yearSeniority[i][1]);
        }
      }).then(() => {
        new Chart("seniorityCanvas", {
          type: "bar",
          data: {
            labels: yearSeniorityLabels,
            datasets: [
              {
                data: yearSeniorityData,
                backgroundColor: vm.chartJsBgColor,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: "年資",
              },
            },
          },
        });
      });
    },
    uiSalaryFn() {
      const salaryObj = Object.entries(this.salary);
      let salaryLabels = [];
      let salaryData = [];
      const vm = this;
      return new Promise((resolve) => {
        resolve();
        for (let i = 0; salaryObj.length > i; i++) {
          salaryLabels.push(salaryObj[i][0]);
          salaryData.push(salaryObj[i][1]);
        }
      }).then(() => {
        new Chart("salaryCanvas", {
          type: "bar",
          data: {
            labels: salaryLabels,
            datasets: [
              {
                data: salaryData,
                backgroundColor: vm.chartJsBgColor,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: "年薪",
              },
            },
          },
        });
      });
    },
    uiCompanyIndustryFn() {
      const companyIndustryObj = Object.entries(this.companyIndustry);
      let industryObjLabels = [];
      let industryObjData = [];
      const vm = this;
      return new Promise((resolve) => {
        resolve();
        for (let i = 0; companyIndustryObj.length > i; i++) {
          industryObjLabels.push(companyIndustryObj[i][0]);
          industryObjData.push(companyIndustryObj[i][1]);
        }
      }).then(() => {
        new Chart("industryCanvas", {
          type: "pie",
          data: {
            labels: industryObjLabels,
            datasets: [
              {
                data: industryObjData,
                backgroundColor: [
                  "rgba(255, 99, 132)",
                  "rgba(54, 162, 235)",
                  "rgba(255, 206, 86)",
                  "rgba(75, 192, 192)",
                  "rgba(153, 102, 255)",
                  "rgba(255, 159, 64)",
                  "rgba(255, 204, 86)",
                  "rgba(201, 203, 207)",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true },
              title: {
                display: true,
                text: "產業分布",
              },
            },
          },
        });
      });
    },
  },
  mounted() {
    let jobTenure = [];
    let salary = [];
    let industry = [];
    for (let i = 0; this.uiJson.length > i; i++) {
      if (!this.dataArea[this.uiJson[i].company.area]) {
        this.dataArea[this.uiJson[i].company.area] = 1;
      } else {
        this.dataArea[this.uiJson[i].company.area]++;
      }
      if (!this.dataSexual[this.uiJson[i].gender]) {
        this.dataSexual[this.uiJson[i].gender] = 1;
      } else {
        this.dataSexual[this.uiJson[i].gender]++;
      }
      if (!this.dataAge[this.uiJson[i].age]) {
        this.dataAge[this.uiJson[i].age] = 1;
      } else {
        this.dataAge[this.uiJson[i].age]++;
      }
      let noneInfoGroup = this.uiJson[i].major.indexOf("資訊科系相關");
      if (noneInfoGroup !== -1) {
        this.dataDepartment["資訊科系相關"]++;
      }

      if (!jobTenure[this.uiJson[i].company.job_tenure]) {
        jobTenure[this.uiJson[i].company.job_tenure] = 1;
      } else {
        jobTenure[this.uiJson[i].company.job_tenure]++;
      }
      if (!salary[this.uiJson[i].company.salary]) {
        salary[this.uiJson[i].company.salary] = 1;
      } else {
        salary[this.uiJson[i].company.salary]++;
      }
      if (!industry[this.uiJson[i].company.industry]) {
        industry[this.uiJson[i].company.industry] = 1;
      } else {
        industry[this.uiJson[i].company.industry]++;
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
    this.dataDepartment["非資訊科系相關"] =
      Number(this.uiJson.length) - Number(this.dataDepartment["資訊科系相關"]);

    this.uiBaseDataPlotFn();
  },
};
</script>