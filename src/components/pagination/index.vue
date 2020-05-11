<template>
  <div class="pagination">
    <el-pagination
      v-if="pageTotal >= 0"
      :page-size="paginations.pageSize"
      :layout="paginations.layout"
      :total="pageTotal"
      :current-page="page"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "pagination",
  data() {
    return {
      paginations: {
        pageSize: 16, // 1页显示多少条
        layout: "total,  prev, pager, next, jumper" // 翻页属性,
      }
    };
  },
  props: {
    pageTotal: Number
  },
  created() {},
  mounted() {},
  methods: {
    // 上下分页 pageIndex
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    },
    // 每页多少条切换 pageSize
    handleSizeChange(pageSize) {
      this.$emit("handleSizeChange", pageSize);
    }
  },
  computed: {
    ...mapState(["page"])
  }
};
</script>

<style scoped>
.pagination {
  text-align: right;
  padding: 10px 18px;
}
</style>
