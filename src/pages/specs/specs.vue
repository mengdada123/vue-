<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>

      <v-list></v-list>

      <v-form ref="form" :info="info"></v-form>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vForm from './components/form'
import vList from './components/list'
export default {
  components:{
    vForm,
    vList
  },
  data() {
    return {
      info:{
        isshow:false,
        title:"添加规格"
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods:{
    ...mapActions({}),
    willAdd(){
      this.info={
        isshow:true,
        title:'添加规格'
      }
    }
  }

}
</script>

<style>

</style>