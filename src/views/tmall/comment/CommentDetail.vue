<template>
  <div class="app-container comments">
    <div class="filter-container">
      <el-select v-model="listQuery.appendComment" placeholder="评论类型" clearable style="width: 130px">
        <el-option label="有追评" value="1" />
        <el-option label="无追评" value="0" />
      </el-select>
      <el-input
        v-model="listQuery.content"
        placeholder="搜索内容"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-sort" @click="resetFilter">重置</el-button>
    </div>
    <table>
      <tr v-for="(comment,index) in list" :key="index">
        <td style="width:100%;min-width:300px;border-bottom: 1px solid gray;">
          <div class="first-comment">
            <div>
              <div style="color:gray;margin-bottom:10px;">初次评价 {{comment.rateDate}}</div>
            </div>
            <div>{{comment.rateContent}}</div>
            <div v-if="comment.pics.length>0">
              <div
                v-for="(url,index) in comment.pics"
                :key="index"
                style="display: inline-block;margin-right:3px;"
              >
                <el-image style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
              </div>
            </div>
          </div>
          <div class="append-comment" v-if="comment.appendComment">
            <div>
              <div style="color:gray;margin:10px 0;">{{comment.appendComment.days}}天后追评</div>
            </div>
            <div style="margin-bottom:10px;">{{comment.appendComment.content}}</div>
            <div>
              <div
                v-for="(url,index) in comment.appendComment.pics"
                :key="index"
                style="display: inline-block;margin-right:3px;"
              >
                <el-image style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
              </div>
            </div>
          </div>
        </td>
        <td
          style="min-width:100px;border-bottom: 1px solid gray;    color: #28a745;text-align:center;"
        >{{comment.displayUserNick}}</td>
      </tr>
    </table>
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
import { commentList } from "@/api/comment";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CommentList",
  components: { Pagination },
  filters: {
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        goodsId: null,
        page: 1,
        limit: 20,
        sortBy: "id",
        sortOrder: "ASC", // ASC or DESC
        appendComment: null,
        content:null
      }
    };
  },
  computed: {},
  created() {
    this.listQuery.goodsId = this.$route.params && this.$route.params.goodsId;
    console.log(this.$route.params.goodsId)
    this.getData();
  },
  methods: {
    resetFilter() {
      this.listQuery.content = null
      this.listQuery.appendComment = null
    },
    getData() {
      this.listLoading = true;
      commentList(this.listQuery).then(response => {
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
.comments {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}
</style>
