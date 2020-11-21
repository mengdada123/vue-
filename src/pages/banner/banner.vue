<template>
  <div>
    <el-button type="success" @click="add()">添加</el-button>
    <v-form :info="info" ref="form"></v-form>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form.vue";
import vList from "./components/list.vue";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加分类",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info = {
        isShow: true,
        title: "添加分类",
      };
    },
    edit(id) {
      (this.info = {
        isShow: true,
        title: "编辑分类",
      }),
        this.$refs.form.getOne(id);
    },
  },
  mounted() {},
  components: {
    vForm,
    vList,
  },
};
</script>

<style>

</style>