<template>
  <section class="app-main">
    <el-scrollbar
      wrapClass="scrollbar-wrap"
      :style="{height:scrollHeight}"
      ref="scrollbarContainer"
    >
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </el-scrollbar>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      scrollHeight: "0px"
    };
  },
  computed: {
    key() {
      return this.$route.path;
    }
  },
  mounted() {
    this.scrollHeight = window.innerHeight * 0.9 + "px";
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.el-scrollbar {
  height: 100%;
  .scrollbar-wrap {
    overflow-x: hidden;
    width: calc(100% + 17px);
  }
}
</style>
