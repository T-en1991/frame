<template>
  <div class="report-view-container">
    <el-form label-position="left" :model="{}" v-loading="loading">
      <div :key="index" v-for="(item, index) in recordList">
        <el-form-item
          v-if="item.type === 'text'"
          style="width: 400px"
          class="view-form-item"
          key="text"
          prop="name"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-input autocomplete="off" placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'multipleText'"
          style="padding-right: 10%"
          class="view-form-item"
          key="multipleText"
          prop="multipleText"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-input
            :rows="3"
            type="textarea"
            autocomplete="off"
            placeholder="请输入..."
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'number'"
          class="view-form-item"
          key="number"
          prop="number"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-input
            style="width: 300px"
            autocomplete="off"
            placeholder="请输入..."
          >
            <template v-if="workUnitMap[item.desc.number.unit]" slot="append">{{
              workUnitMap[item.desc.number.unit]
            }}</template>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'select'"
          class="view-form-item"
          key="select"
          prop="select"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-select value="" style="width: 220px" placeholder="请选择">
            <el-option
              v-for="item in item.desc.select.value
                .split(';')
                .map((item, index) => ({ label: item, value: index }))"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'time'"
          class="view-form-item"
          key="time"
          prop="time"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-date-picker
            style="width: 300px"
            type="datetime"
            placeholder="选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'timeRange'"
          class="view-form-item"
          key="timeRange"
          prop="timeRange"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'date'"
          class="view-form-item"
          key="date"
          prop="date"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-date-picker
            style="width: 300px"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'dateRange'"
          class="view-form-item"
          key="dateRange"
          prop="dateRange"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-date-picker
            style="width: 400px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'image'"
          class="view-form-item"
          key="image"
          prop="image"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <upload-images
            type="disabled"
            accept="jpg,png,jpeg,gif"
            size="mini"
            :dataSize="1024"
            :limitNum="5"
            :remark="`最多上传${
              item.desc.image ? item.desc.image.value : '--'
            }张图片，只能上传jpg、png文件，每张图片最大1M`"
            v-model="tmpImage"
          >
            <p>暂无图片</p>
          </upload-images>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'file'"
          class="view-form-item"
          key="file"
          prop="file"
        >
          <template name="label">
            <cell-limit
              :class="item.isRequired ? 'label-item required' : 'label-item'"
              :el="item.name"
            ></cell-limit>
          </template>
          <el-button
            icon="el-icon-upload"
            type="text"
            style="font-size: 24px"
          ></el-button>
          <div class="image-desc" style="margin-top: 0">
            最多上传{{
              item.desc.file ? item.desc.file.value : "--"
            }}个文件，只能上传pdf、doc、docx、xls、xlsx、ppt、pptx，每个文件最大5M
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import UploadImages from "@/components/UploadImages/index.vue";
import { workUnitMap, workUnitTrigger } from "@/utils/workUnit.js";
export default {
  name: "report-view",
  components: {
    UploadImages,
  },
  props: {
    recordList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    workUnitTrigger();
  },
  data() {
    return {
      workUnitMap,
      // 临时使用的变量
      tmpImage: [],
      tmpFile: [],
      isFalse: false,
      isTrue: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.report-view-container {
  .view-form-item {
    margin-left: 145px;
  }
  .label-item {
    position: absolute;
    width: 130px;
    left: -130px;
    display: flex;
  }
  .label-item.required::before {
    content: "*";
    color: #f56c6c;
    padding-right: 2px;
    position: absolute;
    left: -8px;
  }
  .image-desc {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }
}
</style>
<style lang="scss">
.report-view-container {
  .el-checkbox__label {
    padding-left: 5px;
  }
  .el-radio__label {
    padding-left: 5px;
  }
}
</style>
