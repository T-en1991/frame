<template>
  <div>
    <el-form
      ref="operateListRef"
      label-position="left"
      :model="{}"
      v-loading="loading"
    >
      <array-sort
        v-model="arrayData"
        :tpl="tpl"
        :minSize="$attrs.minSize"
        :maxSize="$attrs.maxSize"
      >
        <template slot="table-header">
          <div class="operate-table-header">
            <div class="name required">操作名称</div>
            <div class="desc required">操作说明</div>
          </div>
        </template>
        <template slot="table-item" slot-scope="{ row }">
          <div class="operate-table-body">
            <el-form-item
              class="name"
              :key="'name' + row.key"
              label=""
              label-width="0"
              :prop="'name' + row.key"
              :rules="{
                validator: nameValueValidation.bind(this, row.key),
              }"
            >
              <el-input
                style="width: 250px"
                v-model="row.name"
                autocomplete="off"
                placeholder="请输入..."
              ></el-input>
            </el-form-item>
            <el-form-item
              class="desc"
              :key="'desc' + row.key"
              label=""
              label-width="0"
              :prop="'desc' + row.key"
              :rules="{
                validator: descValueValidation.bind(this, row.key),
              }"
            >
              <el-input
                :rows="3"
                type="textarea"
                v-model="row.desc"
                autocomplete="off"
                placeholder="请输入..."
              ></el-input>
            </el-form-item>
          </div>
        </template>
      </array-sort>
    </el-form>
  </div>
</template>

<script>
import ArraySort from "@/components/ArraySort/index.vue";
export default {
  components: {
    ArraySort,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 添加用到的空元素模板
      tpl: [
        {
          name: "",
          desc: "",
        },
      ],
      // 动态表单渲染json
      arrayData: [],
    };
  },
  created() {
    this.arrayData = this.$attrs.value;
  },
  methods: {
    nameValueValidation(key, fields, _value, callback) {
      let item = this.arrayData.find((item) => key === item.key);
      const { name } = item;
      if (!name) {
        callback("请输入操作名称");
      }
      if (name.length > 20) {
        callback("操作名称不能超过20个字符");
      }
      callback();
    },
    descValueValidation(key, fields, _value, callback) {
      let item = this.arrayData.find((item) => key === item.key);
      const { desc } = item;
      if (!desc) {
        callback("请输入操作说明");
      }
      if (desc.length > 500) {
        callback("操作说明不能超过500个字符");
      }
      callback();
    },
    submitForm() {
      this.$refs.operateListRef.validate((valid) => {
        if (valid) {
          console.log(this.arrayData);
        }
      });
    },
    getFormRef() {
      return this.$refs.operateListRef;
    },
    getData() {
      return this.arrayData;
    },
  },
  watch: {
    arrayData: {
      handler(nv) {
        this.$emit("input", nv);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.operate-table-header {
  display: flex;
  padding-left: 20px;
  padding-bottom: 8px;
  .name {
    width: 30%;
  }
  .desc {
    width: 70%;
  }
  .required::before {
    margin-right: 2px;
    content: "*";
    color: #f56c6c;
  }
}
.operate-table-body {
  display: flex;
  padding-top: 18px;
  box-sizing: border-box;
  .name {
    width: 30%;
    padding-right: 20px;
  }
  .desc {
    width: 70%;
    padding-right: 30px;
  }
}
</style>
