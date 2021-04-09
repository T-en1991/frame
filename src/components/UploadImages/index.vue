<!--
1.上传图片数量设置limitNum属性，默认4张
2.上传图片样式size，大medium(120*120)，中small(100*100)，小mini(80*80)
3.上传图片类型type,上传：upload，查看：view，只读不可操作：disabled
4.上传图片大小控制，dataSize，单位字节
5.上传图片类型设置，如"jpg,png,jpeg,gif"，逗号隔开
6.上传图片路径设置，url
7.上传图片remark备注
8.上传图片slot，展示无图片时显示文字内容
-->
<template>
  <div ref="uploadImage" :class="{ medium, small, mini }">
    <el-upload
      v-if="type == 'upload' || imageUrlList.length"
      ref="uploadImages"
      action="fakeAction"
      list-type="picture-card"
      :limit="limitNum"
      :file-list="newImgLists"
      :class="{ hide: hideUploadEdit }"
      :http-request="handleHttpRequest"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :disabled="isDisabled"
    >
      <i class="el-icon-plus"></i>
      <div class="el-upload__tip" slot="tip">{{ remark }}</div>
    </el-upload>
    <slot name="tip" v-else></slot>
    <el-dialog
      class="tpl-dialog__wrapper"
      width="800px"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      append-to-body
      :close-on-click-modal="false"
      title="图片预览"
    >
      <div class="view-img__wrapper">
        <el-image
          style="width: 100%; height: 500px"
          :src="dialogImageUrl"
          fit="scale-down"
        ></el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import importImages from "@/api/gec/v1.0/file";
export default {
  name: "index",
  props: {
    size: {
      type: String,
      default: "small",
    },
    dataSize: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: "upload",
    },
    accept: {
      type: String,
      default: "jpg,jpeg,png",
    },
    limitNum: {
      type: Number,
      default: 4,
    },
    imageUrlList: {
      type: Array,
      default() {
        return [];
      },
    },
    remark: {
      type: String,
      default: "",
    },
    url: {
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
    prop: "imageUrlList",
    event: "returnBack",
  },
  mounted() {
    switch (this.size) {
      case "medium":
        this.medium = true;
        this.small = false;
        this.mini = false;
        break;
      case "small":
        this.small = true;
        this.medium = false;
        this.mini = false;
        break;
      case "mini":
        this.mini = true;
        this.small = false;
        this.medium = false;
        break;
    }
    if (this.type == "view") {
      if (this.imageUrlList.length === 0) {
        this.hasPic = true;
      }
      this.hideUploadEdit = true;
      this.isDisabled = true;
    } else if (this.type == "upload") {
      this.hideUploadEdit =
        this.imageUrlList.length >= this.limitNum ? true : false;
      this.isDisabled = false;
    } else {
      this.newImgLists = [];
      this.hideUploadEdit = false;
      this.isDisabled = true;
    }
  },
  watch: {
    imageUrlList(n, o) {
      if (this.type == "upload") {
        this.hideUploadEdit = n.length >= this.limitNum ? true : false;
        this.isDisabled = false;
      }
      this.newImgLists = n;
      if (this.type == "view") {
        if (n.length === 0) {
          this.hasPic = true;
        } else {
          this.hasPic = false;
          this.hideUploadEdit = true;
          this.isDisabled = true;
        }
      } else if (this.type == "upload") {
        this.hideUploadEdit = n.length >= this.limitNum ? true : false;
        this.isDisabled = false;
      } else {
        this.newImgLists = [];
        this.hideUploadEdit = false;
        this.isDisabled = true;
      }
    },
  },
  data() {
    return {
      newImgLists: this.imageUrlList,
      dialogImageUrl: "",
      hasPic: false,
      isDisabled: false,
      dialogVisible: false,
      hideUploadEdit: false, // 隐藏'上传按钮'
      medium: false,
      small: true,
      mini: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.newImgLists = fileList;
      this.$emit("returnBack", this.newImgLists);
      this.$emit("change", this.newImgLists);
      this.hideUploadEdit = fileList.length >= this.limitNum;
    },
    handleChange(file, fileList) {
      if (file.status == "ready") {
        fileList.pop();
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleHttpRequest(params) {
      //#region 文件校验
      const file = params.file;
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let imageTypeArr = this.accept.split(",");
      let isIMAGE = imageTypeArr.indexOf(extension) > -1;
      let isLt1M = file.size < this.dataSize * 1024 * 1024;
      if (!isIMAGE) {
        this.$message.error("请选择" + this.accept + "类型");
        return;
      }
      if (!isLt1M) {
        // this.$message.error('上传文件大小不能超过' + this.dataSize + 'KB!');
        this.$message.error("上传文件大小不能超过" + this.dataSize + "M!");
        return;
      }
      //#endregion

      //#region 文件FormData
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);
      //#endregion`

      //#region 文件请求
      importImages
        .importImages({
          url: this.url,
          form,
        })
        .then((res) => {
          const obj = {};
          obj[this.props.url] = res.url;
          obj[this.props.name] = res.name;
          obj[this.props.halfUrl] = res.halfUrl;
          this.newImgLists.push(obj);
          this.$emit("returnBack", this.newImgLists);
          this.hideUploadEdit = this.newImgLists.length >= this.limitNum;
          this.$emit("change", this.newImgLists);
        })
        .catch(() => {
          // xxx
          this.$emit("returnBack", this.newImgLists);
          this.hideUploadEdit = this.newImgLists.length >= this.limitNum;
        });
      //#endregion
    },
  },
};
</script>

<style lang="scss" scoped>
/*隐藏上传按钮*/
.medium /deep/ {
  .el-upload--picture-card {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 120px;
    height: 120px;
  }
}
.small /deep/ {
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
}
.mini /deep/ {
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }
}

/deep/ .hide .el-upload--picture-card {
  display: none;
}

/deep/.el-upload-list__item.is-ready {
  display: none;
}
</style>
