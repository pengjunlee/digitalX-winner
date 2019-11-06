<template>
  <div class="app-container">
    <div id="words-container" style="position: absolute;bottom: 0px;top: 0px;left:0px;right:0px;"></div>
  </div>
</template>

<script>
import { param } from "@/utils";
import { wordsList } from "@/api/comment";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CommentWords",
  data() {
    return {
      rateword_list: [],
      goodsId: null
    };
  },
  computed: {},
  created() {
    this.goodsId = this.$route.params && this.$route.params.goodsId;
    console.log(this.$route.params.goodsId);
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      wordsList(this.goodsId).then(response => {
        this.rateword_list = response.data;
        this.listLoading = false;

        var Highcharts = require("highcharts");

        // 在 Highcharts 加载之后加载功能模块
        require("highcharts/modules/exporting")(Highcharts);
        require("highcharts/modules/wordcloud")(Highcharts);
        require("highcharts/modules/oldie")(Highcharts);
        // require("highcharts/themes/sand-signika")(Highcharts);
        // require("highcharts/themes/skies")(Highcharts);
        // require("highcharts/themes/dark-blue")(Highcharts);
        // require("highcharts/themes/sunset")(Highcharts);
        require("highcharts/themes/grid-light")(Highcharts);
        // require("highcharts/themes/grid")(Highcharts);
        // require("highcharts/themes/gray")(Highcharts);
        // require("highcharts/themes/dark-unica")(Highcharts);
        // require("highcharts/themes/dark-green")(Highcharts);
        // require("highcharts/themes/avocado")(Highcharts);

        // 创建图表
        Highcharts.chart("words-container", {
          series: [
            {
              type: "wordcloud",
              data: this.rateword_list
            }
          ],
          title: {
            text: "词云图"
          }
        });
      });
    }
  }
};
</script>

<style scoped>
</style>
