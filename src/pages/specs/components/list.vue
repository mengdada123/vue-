<template>
  <div>
      <el-table
    ref="singleTable"
    :data="[]"
    highlight-current-row
    style="width: 100%">
    <el-table-column  type="index"  width="50"></el-table-column>
    <el-table-column  property="date"  label="规格编号"  ></el-table-column>
    <el-table-column  property="name"  label="规格名称"  ></el-table-column>
    <el-table-column  property="address"  label="规格属性"></el-table-column>
    <el-table-column  property="address"  label="状态">
       <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
    </el-table-column>
    <el-table-column  property="address"  label="操作">
      <template>
       <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            
            <del-btn @confirm="del(scope.row.id)"></del-btn>
      </template>

    </el-table-column>
  </el-table>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {successAlert} from '../../../utils/alelt'
import {reqspecsDel} from '../../../utils/http'
export default {
  data() {
    return {
      
    }
  },
  computed:{
    ...mapGetters({})
    },
    methods:{
      ...mapActions({
         reqList:"specs/reqList",
      })
    },
    mounted(){
      this.reqList()
    }

}
</script>

<style>

</style>