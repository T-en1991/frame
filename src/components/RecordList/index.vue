<template>
  <div>
    <el-form
      ref="recordListRef"
      label-position="left"
      class="record-list-form"
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
          <div class="record-table-header">
            <div class="name required">参数名称</div>
            <div class="type required">参数类型</div>
            <div class="desc required">参数说明</div>
            <div class="need">是否必填</div>
          </div>
        </template>
        <template slot="table-item" slot-scope="{ row }">
          <div class="record-table-body">
            <el-form-item
              class="name"
              :key="'name' + row.key"
              label=""
              label-width="0"
              :prop="'name' + row.key"
              :rules="{
                validator: validation.nameValueValidation.bind(
                  this,
                  row.key,
                  arrayData
                ),
              }"
            >
              <el-input
                v-model="row.name"
                autocomplete="off"
                placeholder="请输入..."
              ></el-input>
            </el-form-item>
            <el-form-item
              class="type"
              :key="'type' + row.key"
              label=""
              label-width="0"
              :prop="'type' + row.key"
              :rules="{
                validator: validation.typeValueValidation.bind(
                  this,
                  row.key,
                  arrayData
                ),
              }"
            >
              <el-select
                v-model="row.type"
                placeholder="请选择"
                @change="handleTypeChange(row.key)"
              >
                <el-option
                  v-for="item in paraTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="desc" v-if="row.type === ''"></div>
            <!-- 文本 -->
            <div class="desc" v-if="row.type === 'text'">
              <el-form-item
                :key="'desc-text' + row.key"
                label=""
                label-width="0"
                :prop="'desc-text' + row.key"
                :rules="{
                  validator: validation.descTextValueValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input placeholder="请输入..." v-model="row.desc.text.value">
                  <template slot="append">字符</template>
                </el-input>
              </el-form-item>
            </div>
            <!-- 多行文本 -->
            <div class="desc" v-if="row.type === 'multipleText'">
              <el-form-item
                :key="'desc-multipleText' + row.key"
                label=""
                label-width="0"
                :prop="'desc-multipleText' + row.key"
                :rules="{
                  validator: validation.descMultipleTextValueValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.multipleText.value"
                >
                  <template slot="append">字符</template>
                </el-input>
              </el-form-item>
            </div>
            <!-- 数字 -->
            <div class="desc" v-if="row.type === 'number'">
              <!-- 数字 -> 最小值 -->
              <el-form-item
                style="width: 110px; padding-right: 5px"
                :key="'desc-min' + row.key"
                label=""
                label-width="0"
                :prop="'desc-min' + row.key"
                :rules="{
                  validator: validation.descNumberMinValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.number.min"
                  @input="
                    $refs.recordListRef.validateField('desc-max' + row.key)
                  "
                ></el-input>
              </el-form-item>
              <!-- 数字 -> 含最小值 -->
              <el-form-item
                style="width: 35px; margin-right: 10px"
                :key="'desc-min-include' + row.key"
                label=""
                label-width="0"
                :prop="'desc-min-include' + row.key"
              >
                <el-checkbox
                  v-model="row.desc.number.minInclude"
                  @change="
                    $refs.recordListRef.validateField('desc-min' + row.key)
                  "
                  >含</el-checkbox
                >
              </el-form-item>
              <!-- 数字 -> 最大值 -->
              <el-form-item
                style="width: 110px; margin-right: 5px"
                :key="'desc-max' + row.key"
                label=""
                label-width="0"
                :prop="'desc-max' + row.key"
                :rules="{
                  validator: validation.descNumberMaxValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.number.max"
                  @input="
                    $refs.recordListRef.validateField('desc-min' + row.key)
                  "
                ></el-input>
              </el-form-item>
              <!-- 数字 -> 含最大值 -->
              <el-form-item
                style="width: 35px; margin-right: 10px"
                :key="'desc-max-include' + row.key"
                label=""
                label-width="0"
                :prop="'desc-max-include' + row.key"
              >
                <el-checkbox
                  v-model="row.desc.number.maxInclude"
                  @change="
                    $refs.recordListRef.validateField('desc-max' + row.key)
                  "
                  >含</el-checkbox
                >
              </el-form-item>
              <!-- 数字 -> 小数点位数 -->
              <el-form-item
                style="width: 120px; margin-right: 10px"
                :key="'desc-decimal' + row.key"
                label=""
                label-width="0"
                :prop="'desc-decimal' + row.key"
                :rules="{
                  validator: validation.descNumberDecimalValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.number.decimal"
                ></el-input>
              </el-form-item>
              <!-- 数字 -> 单位 -->
              <el-form-item
                style="width: 120px; padding-right: 10px"
                :key="'desc-unit' + row.key"
                label=""
                label-width="0"
                :prop="'desc-unit' + row.key"
                :rules="{
                  validator: validation.descNumberUnitValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-select v-model="row.desc.number.unit" placeholder="请选择">
                  <el-option
                    v-for="item in workUnitList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 下拉框 -->
            <div class="desc" v-if="row.type === 'select'">
              <!-- 下拉框 : 内容 -->
              <el-form-item
                style="width: 300px; margin-right: 10px"
                :key="'desc-select-value' + row.key"
                label=""
                label-width="0"
                :prop="'desc-select-value' + row.key"
                :rules="{
                  validator: validation.descSelectValueValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.select.value"
                ></el-input>
              </el-form-item>
              <div>
                <!-- 下拉框 : 是否多选 -->
                <el-form-item
                  :key="'desc-select-multiple' + row.key"
                  label=""
                  label-width="0"
                  :prop="'desc-select-multiple' + row.key"
                >
                  <el-checkbox v-model="row.desc.select.multiple"
                    >是否可多选</el-checkbox
                  >
                </el-form-item>
                <div
                  style="
                    font-size: 12px;
                    color: #999999;
                    position: relative;
                    top: -18px;
                  "
                >
                  下拉框选项内容以英文";"分隔
                </div>
              </div>
            </div>
            <!-- 时间 -->
            <div class="desc" v-if="row.type === 'time'">
              时间格式：yyyy-mm-dd hh:mm:ss
            </div>
            <!-- 时间范围 -->
            <div class="desc" v-if="row.type === 'timeRange'">
              时间格式：yyyy-mm-dd hh:mm:ss ~ yyyy-mm-dd hh:mm:ss
            </div>
            <!-- 日期 -->
            <div class="desc" v-if="row.type === 'date'">
              日期格式：yyyy-mm-dd
            </div>
            <!-- 日期范围 -->
            <div class="desc" v-if="row.type === 'dateRange'">
              日期格式：yyyy-mm-dd ~ yyyy-mm-dd
            </div>
            <!-- 图片 -->
            <div class="desc" v-if="row.type === 'image'">
              <el-form-item
                style="width: 200px"
                :key="'desc-image' + row.key"
                label=""
                label-width="0"
                :prop="'desc-image' + row.key"
                :rules="{
                  validator: validation.descImageValueValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.image.value"
                ></el-input>
              </el-form-item>
              <div style="font-size: 12px; color: #999999; margin-left: 10px">
                <div style="font-size: 12px">图片格式：jpg、png</div>
                <div style="font-size: 12px">图片大小：最大1M</div>
              </div>
            </div>
            <!-- 文件 -->
            <div class="desc" v-if="row.type === 'file'">
              <el-form-item
                style="width: 200px"
                :key="'desc-file' + row.key"
                label=""
                label-width="0"
                :prop="'desc-file' + row.key"
                :rules="{
                  validator: validation.descFileValueValidation.bind(
                    this,
                    row.key,
                    arrayData
                  ),
                }"
              >
                <el-input
                  placeholder="请输入..."
                  v-model="row.desc.file.value"
                ></el-input>
              </el-form-item>
              <div style="font-size: 12px; color: #999999; margin-left: 10px">
                <div style="font-size: 12px">
                  文件格式：pdf、doc、docx、xls、xlsx、ppt、pptx
                </div>
                <div style="font-size: 12px">文件大小：最大5M</div>
              </div>
            </div>
            <el-form-item
              class="need"
              :key="'need' + row.key"
              label=""
              label-width="0"
              :prop="'need' + row.key"
            >
              <template>
                <el-radio v-model="row.isRequired" :label="true">是</el-radio>
                <el-radio v-model="row.isRequired" :label="false">否</el-radio>
              </template>
            </el-form-item>
          </div>
        </template>
      </array-sort>
    </el-form>
  </div>
</template>

<script>
import ArraySort from "@/components/ArraySort/index.vue";
import util from "./util.js";
import constant from "./constant.js";
import validation from "./validation.js";
import _ from "lodash";
import {
  workUnitList,
  workUnitMap,
  workUnitTrigger,
} from "@/utils/workUnit.js";
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
  created() {
    workUnitTrigger();
    this.arrayData = this.$attrs.value;
  },
  data() {
    return {
      // 添加用到的空元素模板
      tpl: [
        {
          name: "",
          type: "",
          desc: util.getInitDesc(),
          isRequired: true,
        },
      ],
      // 参数类型选项
      paraTypeOptions: constant.paraTypeOptions,
      workUnitList: [{ label: "请选择", value: "" }, ...workUnitList],
      // 表单验证
      validation: {
        nameValueValidation: validation.nameValueValidation,
        typeValueValidation: validation.typeValueValidation,
        descTextValueValidation: validation.descTextValueValidation,
        descMultipleTextValueValidation:
          validation.descMultipleTextValueValidation,
        descNumberMinValidation: validation.descNumberMinValidation,
        descNumberMaxValidation: validation.descNumberMaxValidation,
        descNumberUnitValidation: validation.descNumberUnitValidation,
        descNumberDecimalValidation: validation.descNumberDecimalValidation,
        descSelectValueValidation: validation.descSelectValueValidation,
        descImageValueValidation: validation.descImageValueValidation,
        descFileValueValidation: validation.descFileValueValidation,
      },
      // 动态表单渲染json
      arrayData: (this.$attrs.data || []).map((item) => {
        return {
          ...item,
          key: _.uniqueId("def_"),
          desc: {
            ...util.getInitDesc(),
            [item.type]: item.desc[item.type],
          },
        };
      }),
    };
  },
  methods: {
    getFormRef() {
      return this.$refs.recordListRef;
    },
    getData() {
      return this.arrayData;
    },
    // 参数类型发生变化
    handleTypeChange(key) {
      // // 1，desc全部初始化
      this.arrayData.forEach((item) => {
        if (key === item.key) {
          item.desc = util.getInitDesc();
        }
      });
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
.record-table-header {
  display: flex;
  padding-left: 20px;
  padding-bottom: 4px;
  .name {
    width: 15%;
  }
  .type {
    width: 14%;
  }
  .desc {
    width: 58%;
  }
  .need {
    width: 13%;
  }
  .required::before {
    margin-right: 2px;
    content: "*";
    color: #f56c6c;
  }
}
.record-table-body {
  display: flex;
  padding-top: 18px;
  * {
    box-sizing: border-box;
  }
  .name {
    width: 15%;
    padding-right: 20px;
  }
  .type {
    width: 14%;
    padding-right: 20px;
  }
  .desc {
    width: 58%;
    display: flex;
    padding-right: 20px;
  }
  .need {
    width: 13%;
  }
}
</style>
<style lang="scss">
.record-list-form .desc {
  .el-checkbox__label {
    padding-left: 3px;
  }
  .el-input__inner {
    padding: 0 10px;
  }
}
.record-list-form .need .el-radio__label {
  padding-left: 3px;
}
</style>
