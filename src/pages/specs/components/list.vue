<template>
  <div>
      <el-table
    ref="singleTable"
    :data="list"
    highlight-current-row
    style="width: 100%"
    :tree-props="{children: 'children'}"
    >
    <el-table-column  property="id"  label="规格编号"  ></el-table-column>
    <el-table-column  property="specsname"  label="规格名称"  ></el-table-column>
    <el-table-column  property="address"  label="规格属性" >
      <template slot-scope="scope">
            <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
          </template>
    </el-table-column>

    <el-table-column   label="状态">
       <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
       <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            
            <del-btn @confirm="del(scope.row.id)"></del-btn>
      </template>

    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="size"
      @current-change="changePage"
      ></el-pagination>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {successAlert} from '../../../utils/alelt'
import {reqspecsDel} from '../../../utils/http'
export default {
  computed:{
    ...mapGetters({
       list: "specs/list",
       total:"specs/total",
       size:"specs/size"
    })
    },
    methods:{
      ...mapActions({
      reqList: "specs/reqList",
      reqCount:"specs/reqCount",
      changePage:"specs/changePage"
      }),
      del(id) {
      reqspecsDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqCount()
        }
      });
    },
    edit(id){
        this.$emit("edit", id);
      }
    },
    
    mounted(){
      this.reqList();
    this.reqCount()
    }

}
</script>

<style>

</style>