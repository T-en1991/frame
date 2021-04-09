<template>
  <div class="upload-pdf__wrapper">
    <el-upload
      v-if="type == 'upload'"
      class="upload-demo"
      action="fakeAction"
      :class="{ hide: hideUploadEdit }"
      :http-request="handleHttpRequest"
      :show-file-list="false"
      :disabled="isDisabled"
    >
      <el-button size="mini" icon="el-icon-upload" type="text"></el-button>
    </el-upload>
    <ul v-if="type == 'upload'" class="upload-file__wrapper">
      <li v-for="(item, index) in newPdfList" :key="index">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item[props.name]"
          placement="top"
        >
          <el-tag
            @close="delTag(index)"
            type="primary"
            size="small"
            closable
            effect="plain"
            ><span class="text__wrapper">{{ item[props.name] }}</span></el-tag
          >
        </el-tooltip>
      </li>
      <div class="remark-content" v-if="type == 'upload'">{{ remark }}</div>
    </ul>

    <ul v-else class="view-file__wrapper">
      <li
        v-for="(item, index) in newPdfList"
        :key="index"
        @click="pdfPreview(item)"
        style="margin-right: 6px"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="item[props.name]"
          placement="top"
        >
          <div><i class="el-icon-document"></i>{{ item[props.name] }}</div>
        </el-tooltip>
      </li>
      <div class="remark-content" v-if="type == 'upload'">{{ remark }}</div>
    </ul>
    <slot v-if="type == 'view' && newPdfList.length == 0" name="emptyText">
    </slot>
  </div>
</template>

<script>
import importPdf from "@/api/gec/v1.0/file";

export default {
  name: "index",
  props: {
    size: {
      type: String,
      default: "small",
    },
    dataSize: {
      type: Number,
      default: 1024,
    },
    type: {
      type: String,
      default: "upload",
    },
    accept: {
      type: String,
      default: "pdf,PDF",
    },
    limitNum: {
      type: Number,
      default: 5,
    },
    pdfList: {
      type: Array,
      default() {
        return [];
      },
    },
    url: {
      type: String,
      default: "",
    },
    remark: {
      type: String,
      default: "",
    },
    props: {
      type: Object,
      default: () => {
        return {
          name: "name",
          url: "url",
          halfUrl: "halfUrl",
        };
      },
    },
  },
  model: {
    prop: "pdfList",
    event: "returnBack",
  },
  data() {
    return {
      newPdfList: this.pdfList,
      isDisabled: false,
      hideUploadEdit: false, // 隐藏'上传按钮'
    };
  },
  mounted() {
    if (this.type == "view") {
      this.hideUploadEdit = true;
      this.isDisabled = true;
    } else {
      this.hideUploadEdit =
        this.newPdfList.length >= this.limitNum ? true : false;
      this.isDisabled = false;
    }
  },
  methods: {
    handleChange(file, fileList) {
      if (file.status == "ready") {
        fileList.pop();
      }
      this.hideUploadEdit = fileList.length >= this.limitNum ? true : false;
    },

    handlePreview(file) {
      const url = file.url;
      window.open(url);
      /*  const elink = document.createElement('a'); // 创建a标签
      elink.style.display = 'none';
      elink.href = url;
      document.body.appendChild(elink);
      elink.click(); // 触发点击a标签事件
      document.body.removeChild(elink);*/
    },
    handleHttpRequest(param) {
      const file = param.file;
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let imageTypeArr = this.accept.split(",");
      let isPDF = imageTypeArr.indexOf(extension) > -1;
      let isLt5M = file.size < this.dataSize * 1024 * 1024;

      if (!isPDF) {
        this.$message.error("请选择" + this.accept + "类型");
        this.$emit("returnBack", this.newPdfList);

        this.hideUploadEdit =
          this.newPdfList.length >= this.limitNum ? true : false;
        return;
      }
      if (!isLt5M) {
        this.$message.error(`上传文件大小不能超过${this.dataSize}M!`);
        this.$emit("returnBack", this.newPdfList);
        this.hideUploadEdit =
          this.newPdfList.length >= this.limitNum ? true : false;
        return;
      }

      //#region 文件FormData
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);

      //#endregion
      //#region 文件请求
      importPdf
        .importPdf({
          url: this.url,
          form,
        })
        .then((res) => {
          //自行处理各种情况
          const obj = {};
          obj[this.props.url] = res.url;
          obj[this.props.name] = res.name;
          obj[this.props.halfUrl] = res.halfUrl;
          this.newPdfList.push(obj);
          this.$emit("returnBack", this.newPdfList);
          this.hideUploadEdit =
            this.newPdfList.length >= this.limitNum ? true : false;
          this.$emit("change");
        })
        .catch(() => {
          // xxx
          this.$emit("returnBack", this.newPdfList);
          this.hideUploadEdit =
            this.newPdfList.length >= this.limitNum ? true : false;
          this.$emit("change");
        });
      //#endregion
    },
    delTag(index) {
      const _arr = this.newPdfList;
      _arr.splice(index, 1);
      this.newPdfList = _arr;
      this.$emit("returnBack", _arr);
      this.hideUploadEdit =
        this.newPdfList.length >= this.limitNum ? true : false;
      this.$emit("change");
    },
    pdfPreview(item) {
      const data = item;
      const url = item[this.props.url];
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-pdf__wrapper {
  display: flex;
  align-items: center;

  /deep/ {
    .el-icon-upload {
      font-size: 28px;
    }
  }
  .view-file__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      font-size: 14px;
      text-decoration: underline;
      line-height: 44px;
      cursor: pointer;
      color: #3c91f1;

      line-height: initial;
      // margin-right: 6px;
      margin: 2px;
      cursor: pointer;
      /deep/ .el-tooltip {
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        margin-right: 6px;
      }
      &:hover {
        font-weight: 700;
        i {
          font-weight: 700;
        }
      }
    }
  }
  .upload-file__wrapper {
    margin-left: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li {
      line-height: 44px;
      margin: 0 3px;
      cursor: pointer;
      // margin-right: 6px;
      /deep/ {
        .el-tag--plain {
          box-sizing: border-box;
          .text__wrapper {
            display: inline-block;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: initial;
            vertical-align: -2px;
          }
        }
      }
    }
  }

  .remark-content {
    font-size: 20px;
    color: #666;
    white-space: nowrap;
    transform: scale(0.55);
    font-weight: 700;
    margin-left: -100px;
  }
}

.hide {
  display: none;
}
</style>
