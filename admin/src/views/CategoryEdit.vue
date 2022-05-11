<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      @submit.native.prevent="save('ruleForm')"
    >
      <el-form-item label="上级分类" prop="name">
        <el-select v-model="model.parent" size="normal" clearable>
          <el-option
            v-for="item in parents"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name" size="normal" clearable></el-input>
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
  name: "CategoryEdit",
  data() {
    return {
      model: {},
      parents: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    save(formName) {
      // 校验
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result;
          if (this.id) {
            result = await this.$http.put(`/rest/categories/${this.id}`, this.model);
          } else {
            result = await this.$http.post("/rest/categories", this.model);
          }
          this.$router.push("/categories/list");
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
      const res = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`/rest/categories/`);
      this.parents = res.data;
    },
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
};
</script>
<style lang="scss" scoped>
</style>