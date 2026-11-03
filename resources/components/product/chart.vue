<template>
  <div class="w-full bg-white rounded-xl overflow-y-auto min-w-[90vw] md:min-w-[600px]" >
    <div class="mb-8">
      <row class="text-center p-2 " style="width: 100%">
        <btn icon @click.native="closeDialog">
          <icon :name="icons.close"></icon>
        </btn>
        <space/>
        <span class="pt-2">
           نمودار قیمت
        </span>
        <space/>
      </row>
      <space/>
    </div>
    <div v-if="!ready" class="flex justify-center align-center pb-8">
      <icon :name="icons.load" class="animate-bounce"/>
    </div>
    <transition name="fade">
      <div class="overflow-hidden w-full" v-show="ready">
        <div id="chart" :class="models.length > 1 ? '-mb-2' : 'mb-4'" class="mt-3 mx-3 -ml-8 " style="cursor: pointer"></div>
      </div>
    </transition>
    <row v-if="models.length > 1" class="m-3 justify-center">
      <btn v-for="(model,i) in models" :key="model.id" class="mx-1 px-1" color="blue" text @click.native="manageSeries(i)"> مدل {{ getNumber(model.name) }}</btn>
    </row>
  </div>
</template>
<script>
import {mdiCloseOutline, mdiDownloadOutline} from '@mdi/js';

export default {
  props: ['models'],
  data() {
    return {
      apex: null,
      name: '',
      icons: {
        close: mdiCloseOutline,
        load: mdiDownloadOutline
      },
      ready: false,
      apexChart: {
        series: [{name: '', data: []}],
        grid: {
          show: true,
          borderColor: '#e5e5e5',
          position: 'back',
        },
        colors: ['#2a2121'],
        stroke: {
          width: 2,
        },
        markers: {
          size: 5,
          shape: 'square',
          colors: '#2a2121',
          hover: {
            size: 7,
          }
        },
        chart: {
          id: "chart",
          type: 'line',
          foreColor: '#535353',
          fontFamily: 'x',
          height: 200,
          width: "100%",
          toolbar: {
            tools: {
              download: false
            }
          },
          zoom: {
            enabled: false
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 3,
          tooltip: {
            enabled: false,
          },
          labels: {
            rotate: 90,
            formatter: function (value, timestamp) {
              let data = new Date(timestamp).toLocaleDateString("fa-IR", {month: 'long', day: 'numeric'});
              return data.split(' ').reverse().join(' ');
            }
          }
        },
        yaxis: {
          min: function (min) {
            return min / 2;
          },
          max: function (max) {
            return max * 1.4;
          },
          tickAmount: 2,
          type: 'category',
          labels: {
            formatter: function (value) {
              const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
              return (Math.floor(value / 1000) * 1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  .replace(/\d/g, x => persianDigits[x]) + ' تومان';
            }
          },
        },
        tooltip: {
          style: {
            fontSize: '14px',
          },
          y: {
            title: {
              formatter: () => ' قیمت ',
            },
            formatter: function (value) {
              if (value.toString().includes('999', 0))
                return 'عدم تولید'
              else {
                const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                return Math.floor(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(/\d/g, x => persianDigits[x]) + ' تومان';
              }
            },
          },
        }
      }
    }
  },
  methods: {
    async manageSeries(modelID = 0) {
      let marks;
      let index = 0;
      let model = this.models[modelID];
      let prices = await this.axios.get('/xproduct/model/' + model.id).then(res => res.data)
      let series = [{name: model.name, data: []}]
      this.name = model.name
      prices.map(price => {
        series[0].data.push({x: new Date(price.created_at).getTime(), y: price.price});
      });
      await ApexCharts.exec('chart', 'updateSeries', series);
      this.ready = true
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 1000)
      setTimeout(function () {
        marks = document.querySelector('.apexcharts-series-markers-wrap')
        series[0].data.map(data => {
          if (data.y.toString().includes('999', 0)) {
            if (index < 2) {
              marks.firstChild.children[index].style.fill = '#999'
            } else {
              marks.children[index - 1].firstChild.style.fill = '#999'
            }
          }
          ++index;
        });
      }, 500)
    },
    closeDialog() {
      this.apex.destroy()
      this.$emit('close')
    }
  },
  mounted() {
    let self = this
    document.getElementById('apex').addEventListener('load', function () {
      self.apex = new ApexCharts(document.querySelector("#chart"), self.apexChart);
      self.apex.render()
      self.manageSeries();
    })
  },
}
</script>
