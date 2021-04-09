<template>
  <div>
    <div class="table-header__wrapper">
      <slot name="table-header"></slot>
      <span class="operate-text">操作</span>
    </div>
    <div v-if="option.length">
      <vuedraggable
        v-model="option"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        :group="drag_Key"
      >
        <transition-group
          tag="ul"
          type="transition"
          :name="!drag ? 'flip-list' : null"
          class="table-body__wrapper tpl-scrollbar__wrapper"
          :class="ref_key"
        >
          <li v-for="(item, index) in option" :key="item.key">
            <div><slot name="table-item" :row="item"></slot></div>
            <el-button
              class="del-btn"
              type="text"
              :disabled="!showDel"
              @click="d(index)"
              >删除</el-button
            >
          </li>
        </transition-group>
      </vuedraggable>
    </div>

    <div v-else class="empty-text">
      <i class="el-icon-warning"></i>当前无数据
    </div>

    <div class="button__wrapper">
      <el-button
        style="width: 100%; margin-top: 10px"
        size="middle"
        @click="a"
        :disabled="addDisable"
      >
        +添加新值
      </el-button>
    </div>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import _ from "lodash";
export default {
  components: {
    vuedraggable,
  },
  props: {
    minSize: {
      type: Number,
      default: 3,
    },
    maxSize: {
      type: Number,
      default: 10,
    },
    sortKey: {
      type: String,
      default: "sort_key",
    },
    value: {
      type: Array,
      default: () => [],
    },
    tpl: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      option: [],
      drag: false,
      ref_key: _.uniqueId("ref_"),
      drag_Key: _.uniqueId("drag_"),
      mminSize: this.minSize,
      mmaxSize: this.maxSize,
    };
  },
  created() {
    const dragKey = _.uniqueId("drag_");
    this.dragKey = dragKey;
    this.mminSize = this.minSize;
    this.mmaxSize = this.maxSize;
    this.option = this.value.map((item) => {
      return {
        key: _.uniqueId("render_"),
        ...item,
      };
    });
  },
  mounted() {
    if (!this.option.length) {
      this.initTpl();
    }
  },
  methods: {
    // 根据最小值初始化模板
    initTpl() {
      if (this.mminSize) {
        do {
          // console.log(this.mminSize)
          this.a();
          this.mminSize -= 1;
        } while (this.mminSize > 0);
      }
    },
    // 添加
    a() {
      if (this.option.length >= this.mmaxSize) return false;
      const _cloneArr = _.cloneDeep(this.tpl);
      _cloneArr[0].key = _.uniqueId();
      const arr = this.option.concat(_cloneArr);
      this.option = arr;
      this.handleChange(this.option);
      // 模拟滚动条至最小方
      setTimeout(() => {
        let table = document.getElementsByClassName(this.ref_key);
        table.forEach((element) => {
          element.scrollTop = element.scrollHeight;
        });
        // table.scrollTop = table.scrollHeight;
      });
    },
    // 删除
    d(index) {
      const arr = this.value;
      arr.splice(index, 1);
      this.handleChange(arr);
    },

    // 操作后用户操作
    handleChange(v) {
      this.$emit("input", v);
    },

    // 拖拽事件回调
    // myend() {
    //   console.log(this.option);
    // },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    showDel() {
      return this.option.length > this.minSize;
    },
    addDisable() {
      return this.option.length >= this.mmaxSize;
    },
  },
  watch: {
    option: {
      handler(n, o) {
        console.log(n);
        this.$emit("input", n);
      },
      deep: true,
    },
    value: {
      handler(n, o) {
        this.option = n;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header__wrapper {
  padding-right: 60px;
  border-bottom: 1px solid #dcdfe6;
  padding: 20px 60px 5px 20px;
  position: relative;
  background: #fff;

  .operate-text {
    position: absolute;
    right: 20px;
    top: 50%;
    padding: 0;
    margin-top: -8px;
  }
}
.table-body__wrapper > li {
  padding: 0 20px;
  padding-right: 60px;
  position: relative;
  border: solid 1px transparent;
  background: #fff;
  border-bottom-color: #dcdfe6;
  &:hover {
    background: #ebf2f9;
    border-color: #22a4ff;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.14);
  }
  .del-btn {
    position: absolute;
    right: 20px;
    top: 50%;
    padding: 0;
    margin-top: -8px;
  }
}

// 添加按钮

.button__wrapper {
  // padding-left: 40px;
  // padding-right: 80px;
  // margin-top: 20px;
}
.add-row-inner {
  border: 1px dashed #9a9a9a;
  cursor: pointer;
  color: #9a9a9a;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}
.add-row-inner.disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

// 过度动画
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
.empty-text {
  background: #fff;
  text-align: center;
  color: #909399;
  font-size: 12px;
  i {
    font-size: 12px;
    color: #909399;
    padding: 30px 0;
    margin-right: 2px;
  }
}
</style>
