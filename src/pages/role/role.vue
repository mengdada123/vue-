<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>
     <v-from :info="info" ref="form"></v-from>
     <v-list :list="list" @init="init" @edit="edit"></v-list>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vFrom from './components/from.vue'
import vList from './components/list.vue'
import {reqRoleList} from "../../utils/http"
export default {
  data() {
    return {
       info:{
        isshow:false,
        title:"添加角色"
      },
      list:[]
    }
  },
  components:{
    vFrom,
    vList
  },
  computed: {
    ...mapGetters({})
  },
  methods:{
    ...mapActions({}),
    willAdd(){
      this.info={
        isshow:true,
        title:"添加角色"
      }
    },
    init(){
      reqRoleList().then(res=>{
        this.list=res.data.list
      })
    },
    
    edit(id){
      this.info={
        isshow:true,
        title:"编辑角色"
      }
      this.$refs.form.getOne(id)
    }
  },
  mounted(){
     this.init()
     console.log(this.list);
  },

}
</script>

<style>

</style>