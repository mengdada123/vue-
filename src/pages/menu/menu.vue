<template>
  <div>
      
      <el-button type="primary" @click="willAdd">添加</el-button>

      <v-list :list='list'  @init="init" @edit="edit($event)"></v-list>

      <v-from :info="info" :list='list' @init='init' ref="form"></v-from>
  </div>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import vList from './components/list'
import vFrom from './components/from'
import { reqMenuList} from "../../utils/http";
export default {

  data() {
    return {
      list: [],
      info: {
        title:'添加菜单',
        isshow: false,
      }
    }
  },
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapActions({

    }),
    edit(id){
      //弹框出现
      this.info.isshow=true
      // 34.给info补了一个字段，用来判断是添加还是编辑打开的弹框
      this.info.title="编辑菜单"
      //37.父组件调用子组件 form.vue 的getOne()
      this.$refs.form.getOne(id)
    },
    init(){ 
      reqMenuList().then(res => { 
        this.list = res.data.list; 
        }); 
        }
    ,
    willAdd(){ 
      this.info.isshow = true; 
      this.info.title="添加菜单"
      }
  },
  mounted() {
    this.init()
    
  },
  components:{
    vList,
    vFrom

  }
}
</script>

<style>

</style>