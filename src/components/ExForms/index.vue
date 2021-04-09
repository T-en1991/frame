<template>
  <div class="ex-forms__wrapper">
    <label class="label" :style="{ width: $attrs['label-width'] }">{{
      label
    }}</label>
    <el-form
      class="ex-forms"
      ref="exformValidate"
      :rules="rules"
      :model="ruleForm"
    >
      <el-select
        v-model="ruleForm.frequencyType"
        placeholder="请选择"
        @change="typeChange"
      >
        <el-option label="一次" value="once"></el-option>
        <el-option label="按天" value="everyDay"></el-option>
        <el-option label="按周" value="everyWeek"></el-option>
        <el-option label="按月" value="everyMonth"></el-option>
      </el-select>

      <div class="choose__wrapper">
        <div
          class="choose-day__wrapper"
          v-if="ruleForm.frequencyType == 'everyDay'"
          style=""
        >
          <span class="letter-left">每</span>
          <el-form-item style="margin-bottom: 0" prop="interval">
            <el-input v-model="ruleForm.interval" @input="valChange"></el-input>
          </el-form-item>
          <span class="letter-right">天</span>
        </div>

        <div
          class="choose-week__wrapper"
          v-if="ruleForm.frequencyType == 'everyWeek'"
        >
          <div class="choose-item__wrapper">
            <span class="letter-left">每</span>
            <el-form-item style="margin-bottom: 0" prop="interval">
              <el-input
                v-model="ruleForm.interval"
                @input="valChange"
              ></el-input>
            </el-form-item>
            <span class="letter-right">周的：</span>
          </div>

          <el-form-item class="week-form__wrapper" prop="dayOfWeek">
            <el-checkbox-group v-model="ruleForm.dayOfWeek" @change="valChange">
              <el-checkbox :label="1">周一</el-checkbox>
              <el-checkbox :label="2">周二</el-checkbox>
              <el-checkbox :label="3">周三</el-checkbox>
              <el-checkbox :label="4">周四</el-checkbox>
              <el-checkbox :label="5">周五</el-checkbox>
              <el-checkbox :label="6">周六</el-checkbox>
              <el-checkbox :label="7">周日</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <div
          class="choose-month__wrapper"
          v-if="ruleForm.frequencyType == 'everyMonth'"
        >
          <!-- 选择月 -->
          <div class="choose-month-item">
            <el-form-item style="margin-bottom: 0" prop="monthOfYear">
              <el-select
                v-model="ruleForm.monthOfYear"
                multiple
                collapse-tags
                placeholder="请选择"
                :popper-append-to-body="true"
                @change="valChange"
                popper-class="choose-month-item__select"
              >
                <el-option label="一月" :value="1"></el-option>
                <el-option label="二月" :value="2"></el-option>
                <el-option label="三月" :value="3"></el-option>
                <el-option label="四月" :value="4"></el-option>
                <el-option label="五月" :value="5"></el-option>
                <el-option label="六月" :value="6"></el-option>
                <el-option label="七月" :value="7"></el-option>
                <el-option label="八月" :value="8"></el-option>
                <el-option label="九月" :value="9"></el-option>
                <el-option label="十月" :value="10"></el-option>
                <el-option label="十一月" :value="11"></el-option>
                <el-option label="十二月" :value="12"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- 选择天 -->

          <el-radio-group
            v-model="monthType"
            style="margin-left: 10px"
            @change="monthTypeChange"
          >
            <el-radio :label="1">
              <span style="margin-right: 5px">天</span>
              <el-form-item
                style="margin-bottom: 0; display: inline-block"
                prop="dayOfMonth"
              >
                <el-select
                  v-model="ruleForm.dayOfMonth"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  :popper-append-to-body="true"
                  class="month-day-select"
                  @change="valChange"
                  popper-class="choose-month-day__select"
                  :disabled="monthType == 2"
                >
                  <el-option
                    v-for="item in 31"
                    :key="item"
                    :label="item > 9 ? item : '0' + item"
                    :value="item"
                  ></el-option>
                  <el-option
                    style="width: 110px"
                    label="最后一个"
                    :value="-1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-radio>

            <!-- 选择日 -->

            <el-radio :label="2">
              <span style="margin-right: 5px">在</span>

              <el-form-item
                style="margin-bottom: 0; display: inline-block"
                prop="weekOfMonth"
              >
                <el-select
                  v-model="ruleForm.weekOfMonth"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  :popper-append-to-body="true"
                  @change="valChange"
                  :disabled="monthType == 1"
                >
                  <el-option label="第一个" :value="1"></el-option>
                  <el-option label="第二个" :value="2"></el-option>
                  <el-option label="第三个" :value="3"></el-option>
                  <el-option label="第四个" :value="4"></el-option>
                  <el-option label="最后一个" :value="-1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                style="
                  margin-bottom: 0;
                  display: inline-block;
                  margin-left: 10px;
                "
                prop="dayOfWeek"
              >
                <el-select
                  v-model="ruleForm.dayOfWeek"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  :popper-append-to-body="true"
                  @change="valChange"
                  :disabled="monthType == 1"
                >
                  <el-option label="星期一" :value="1"></el-option>
                  <el-option label="星期二" :value="2"></el-option>
                  <el-option label="星期三" :value="3"></el-option>
                  <el-option label="星期四" :value="4"></el-option>
                  <el-option label="星期五" :value="5"></el-option>
                  <el-option label="星期六" :value="6"></el-option>
                  <el-option label="星期日" :value="7"></el-option>
                </el-select>
              </el-form-item>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 按天 -->

      <!-- 按周 -->
      <!-- 按月 -->
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: "执行频率",
      type: String,
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    // 校验数字
    const checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }

      if (value === "0") {
        return callback(new Error("必须>0"));
      }

      const weekType = this.ruleForm.frequencyType;
      const re = /^[0-9]+$/;
      if (weekType == "everyWeek") {
        if (!re.test(value)) {
          return callback(new Error("必须1-99"));
        }
        if (value > 99) {
          return callback(new Error("必须1-99"));
        }
      } else {
        if (!re.test(value)) {
          return callback(new Error("必须1-999"));
        }
        if (value > 999) {
          return callback(new Error("必须1-999"));
        }
      }

      callback();
    };
    return {
      monthType: 1,
      ruleForm: {
        frequencyType: "once", //标准执行频率类型
        interval: "", //间隔时间
        dayOfWeek: [], //周几
        monthOfYear: [], //月份
        dayOfMonth: [], //每月几号
        weekOfMonth: [], //当前月第几周会执行
      },
      rules: {
        interval: [{ validator: checkNum, trigger: "change" }],
        dayOfWeek: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        monthOfYear: [
          { required: true, message: "请选择月份", trigger: "change" },
        ],
        dayOfMonth: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        weekOfMonth: [
          { required: true, message: "请选择第几周", trigger: "change" },
        ],
      },
    };
  },
  created() {
    const {
      frequencyType,
      interval,
      dayOfWeek,
      monthOfYear,
      dayOfMonth,
      weekOfMonth,
    } = this.value;

    this.ruleForm.frequencyType = frequencyType;
    this.ruleForm.interval = interval;
    this.ruleForm.dayOfWeek = dayOfWeek;
    this.ruleForm.monthOfYear = monthOfYear;
    this.ruleForm.dayOfMonth = dayOfMonth;
    this.ruleForm.weekOfMonth = weekOfMonth;
    this.monthType =
      frequencyType == "everyMonth"
        ? dayOfMonth.length || !weekOfMonth.length
          ? 1
          : 2
        : 1;
  },
  methods: {
    //标准执行频率类型改变时，清空已经选择的数据
    typeChange(type) {
      this.ruleForm.interval = ""; //间隔时间
      this.ruleForm.dayOfWeek = []; //周几
      this.ruleForm.monthOfYear = []; //月份
      this.monthType = 1; //前端要用的辅助字段
      this.ruleForm.dayOfMonth = []; //每月几号
      this.ruleForm.weekOfMonth = []; //当前月第几周会执行
      setTimeout(() => {
        this.$refs.exformValidate.clearValidate();
      });
      this.valChange();
    },
    monthTypeChange() {
      // 月份类型变化是清空对应数据
      this.ruleForm.dayOfMonth = []; //每月几号
      this.ruleForm.weekOfMonth = []; //当前月第几周会执行
      this.ruleForm.dayOfWeek = []; //周几
      setTimeout(() => {
        this.$refs.exformValidate.clearValidate();
      });
      this.valChange();
    },
    // 表单校验
    _valite(cb) {
      const { frequencyType } = this.ruleForm;
      let valiteArr = [];
      if (frequencyType == "everyDay") {
        valiteArr = [];
        this.$refs.exformValidate.validateField(["interval"], (v) => {
          valiteArr.push(v);
        });
      } else if (frequencyType == "everyWeek") {
        valiteArr = [];
        this.$refs.exformValidate.validateField(
          ["interval", "dayOfWeek"],
          (v) => {
            valiteArr.push(v);
          }
        );
      } else if (frequencyType == "everyMonth") {
        valiteArr = [];
        if (this.monthType == 1) {
          this.$refs.exformValidate.validateField(
            ["monthOfYear", "dayOfMonth"],
            (v) => {
              valiteArr.push(v);
            }
          );
        } else {
          this.$refs.exformValidate.validateField(
            ["monthOfYear", "weekOfMonth", "dayOfWeek"],
            (v) => {
              valiteArr.push(v);
            }
          );
        }
      }
      const _boolean = valiteArr.every((item) => !item);
      cb(_boolean);
    },

    // 表单选择
    valChange() {
      const {
        frequencyType,
        interval,
        dayOfWeek,
        monthOfYear,
        dayOfMonth,
        weekOfMonth,
      } = this.ruleForm;

      const _v = {
        frequencyType,
        interval,
        dayOfWeek,
        monthOfYear,
        dayOfMonth,
        weekOfMonth,
      };
      this.$emit("input", _v);
    },
  },
};
</script>

<style lang="scss" scoped>
.ex-forms__wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 18px;
  .label {
    font-size: 14px;
    width: 100px;
    text-align: right;
    padding-right: 12px;
    box-sizing: border-box;
    color: #606266;
    &::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
}
.ex-forms {
  display: flex;
}
.choose__wrapper {
  margin-left: 10px;
}
.choose-day__wrapper,
.choose-item__wrapper {
  display: flex;
  align-items: center;
  .letter-left {
    margin-right: 6px;
  }
  .letter-right {
    margin-left: 6px;
  }
  /deep/ {
    .el-input {
      width: 60px;
      // margin: 0 6px;
    }
  }
}

.choose-week__wrapper {
  display: flex;
  align-items: center;
}

.choose-month__wrapper {
  display: flex;
}

.week-form__wrapper {
  margin-bottom: 0px;

  /deep/ .el-form-item__content {
    height: 26px;
  }
}
</style>

<style lang="scss">
.choose-month-item__select {
  /deep/ {
    .el-select-dropdown__list {
      display: flex;
      width: 300px;
      flex-wrap: wrap;
      .el-select-dropdown__item {
        width: 100px;
      }
    }
  }
}

.choose-month-day__select {
  /deep/ {
    .el-select-dropdown__list {
      display: flex;
      width: 420px;
      flex-wrap: wrap;
      .el-select-dropdown__item {
        width: 70px;
      }
    }
  }
}
</style>
