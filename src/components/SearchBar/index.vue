<template>
  <div class="search-bar">
    <div class="search-cont" v-for="(item, index) in inputs" :key="item.model+''+index">
      <div class="title" v-if="item.title">{{item.title}}</div>
      <el-input
        :style="{width:item.width+'px'}"
        v-model.trim="seachData.input[item.model]"
        :placeholder="item.placeholder?item.placeholder:'请输入内容'"
        :size="item.size?item.size:'mini'"
        @keyup.enter.native="search"
      ></el-input>
    </div>
    <div class="search-cont" v-for="(item, index) in selects" :key="item.model+''+index">
      <div class="title" v-if="item.title">{{item.title}}</div>
      <el-select
        :style="{width:item.width+'px'}"
        filterable
        clearable
        :size="item.size?item.size:'mini'"
        v-model="seachData.select[item.model]"
        :placeholder="item.placeholder?item.placeholder:'请输入内容'"
        @clear="item.clear?item.clear():undefined"
      >
        <el-option
          v-for="(option, index) in item.options"
          :key="option.name+''+index"
          :label="option.name"
          :value="option.id"
          :disabled="option.disabled"
        ></el-option>
      </el-select>
    </div>
    <div class="search-cont">
      <el-button
        :type="button.type?button.type:'primary'"
        :plain="button.plain"
        :round="button.round"
        :circle="button.circle"
        :disabled="button.disabled"
        icon="el-icon-search"
        @click="search"
        :size="button.size?button.size:'mini'"
      >搜索</el-button>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "SearchBar",
  props: {
    inputs: {
      default: () => {
        return new Array();
      }
    },
    selects: {
      default: () => {
        return new Array();
      }
    },
    button: {
      default: () => {
        return new Object();
      }
    }
  },
  computed: {},
  watch: {
    seachData: {
      handler(val, oldVal) {
        const {
          input: { input }
        } = val;
        if (!input) {
          this.$emit("goGetList");
        }
      },
      deep: true //true 深度监听
    }
  },
  data() {
    return {
      seachData: {
        input: {},
        select: {}
      }
    };
  },
  methods: {
    search() {
      this.$emit("search", this.seachData);
    }
  }
};
</script>
<style scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;
}
.search-cont {
  display: flex;
  align-items: center;
  margin: 5px 10px 5px 0px;
}
.search-cont:last-child {
  margin-right: 0;
}
.title {
  padding-right: 5px;
  flex-shrink: 0;
  font-weight: 900;
}
</style>