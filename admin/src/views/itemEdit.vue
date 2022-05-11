<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      @submit.native.prevent="save('ruleForm')"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" native-type="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <div ref="div"></div>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  name: "itemEdit",
  data() {
    return {
      model: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    afterUpload(res){
      this.$set(this.model, 'icon', res.url)
    },
    save(formName) {
      // 校验
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result;
          if (this.id) {
            result = await this.$http.put(`/rest/items/${this.id}`, this.model);
          } else {
            result = await this.$http.post('/rest/items', this.model);
          }
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "保存成功",
          });
        } else {
          return false;
        }
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>
<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>