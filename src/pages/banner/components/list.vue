<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
            <img :src="$imgPre + scope.row.img">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
            <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
            <el-button type="primary" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click='del(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqbannerDel } from '../../../utils/http'
import { successAlert,errorAlert } from '../../../utils/alelt';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList"
    }),
    del(id){
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqbannerDel(id).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              successAlert('删除成功')
              this.reqList()
            }else{
                errorAlert(res.data.msg)
            }   
          })      
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(id){
        console.log(id)
        this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>