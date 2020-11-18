<template>
  <div>
      <el-table
    ref="singleTable"
    :data="list"
    highlight-current-row
    style="width: 100%">
    <el-table-column type="index"  width="50"></el-table-column>
    <el-table-column  property="id"  label="分类编号" > </el-table-column>
    <el-table-column  property="catename"  label="分类名称" ></el-table-column>
    <el-table-column  property="address"  label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="">
          
        </template>
    </el-table-column>

    <el-table-column  property="name"  label="状态" >
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
    </el-table-column>
    <el-table-column  property="address"  label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- 32.绑定confirm事件 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
    </el-table-column>
  </el-table>
   
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { reqcateDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alelt";
export default {
      data() {
      return {
       tableData:[]
      }
    },
    computed: {
        ...mapGetters({
             list: "cate/list"
        })
    },
    methods:{
        ...mapActions({
            reqList:'cate/reqList'
        }),
     del(id) {
        reqcateDel(id).then(res => {
        if (res.data.code == 200) {
          //成功的弹框
          successAlert(res.data.msg);
          //刷新list
          this.reqList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    }
    },
    mounted(){
        this.reqList()
    }

}
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>