<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="商品名称"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-sort" @click="resetFilter">重置</el-button>
    </div>

      <div class="flex-box">
      <vue-hover-mask v-for="(goods,index) in list" :key="index">
        <!-- 默认插槽 -->
        <div class="flex-item goods-box">
          <img style=" width: 100%;height: 100%;" :src="goods.imgUrl" crossorigin="anonymous" />
          <div
            style="height:20px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#28a745;"
          >{{goods.title}}</div>
          <div
            style="height:20px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#909399;"
          >{{goods.shop}}</div>
        </div>
        <!-- action插槽 -->
        <template v-slot:action>
          <div style="vertical-align: middle;height: 40px;line-height: 40px;">
            <router-link :to="{ name: 'CommentDetail', params: { goodsId: goods.goodsNum }}">
              <div class="btn-fl el-button el-button--success el-button--small">
                <span>
                  <i id="collapsedIcon" class="el-icon-s-grid"></i>
                  评论详情
                </span>
              </div>
            </router-link>
            <router-link :to="{ name: 'CommentWords', params: { goodsId: goods.goodsNum }}">
              <div class="btn-fl el-button el-button--success el-button--small">
                <span>
                  <i id="collapsedIcon" class="el-icon-s-grid"></i>
                  词频统计
                </span>
              </div>
            </router-link>
          </div>
        </template>
      </vue-hover-mask>
    </div>

    <pagination
      style="text-align:right;"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getData"
    />
  </div>
</template>

<script>
import { param } from "@/utils";
import { commentGoodsList } from "@/api/comment";
import VueHoverMask from "@/components/HoverMask";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CommentGoods",
  components: { Pagination, VueHoverMask },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: null
      }
    };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    resetFilter() {
      this.listQuery.title = null
    },
    getData() {
      this.listLoading = true;
      commentGoodsList(this.listQuery).then(response => {
        console.log(response.data.rows);
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getData();
    }
  }
};
</script>

<style scoped>
.flex-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex-item {
  order: 1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  align-self: auto;
}
.goods-box {
  box-sizing: border-box;
  width: 200px;
  height: 300px;
  margin: 5px 5px 5px 5px;
  padding: 5px 5px 50px 5px;
  border: 2px solid #304156;
  border-radius: 3px;
  font-size: 12px;
}
</style>
