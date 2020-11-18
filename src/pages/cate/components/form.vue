<template>
  <div class="add">
       <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form>
        <el-form-item label="上级分类" label-width="120px">
          <el-select placeholder="请选择角色" v-model="user.pid">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
            <!-- 状态按钮 -->
          <el-switch  v-model="value"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加分类'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {reqcateAdd,reqcateDetail} from '../../../utils/http'
import {successAlert,errorAlert} from '../../../utils/alelt'
export default {
    props:['info'],
   data() {
    return {
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      // 2.初始化图片路径
      imgUrl: "",
      value: true
    };
  },

    computed: {
        ...mapGetters({
            cateList: "cate/list"
        })
    },
    
    methods: {
        ...mapActions({
            reqList: "cate/reqList"
        }),
        //   初始化掉
    empty(){
        this.user={
            pid: "",
            catename: "",
            img: null,
            status: 1
        }
        this.imgUrl = ''

    },
        
        add(){
            console.log(this.user);
             reqcateAdd(this.user).then(res => {
                 
        if (res.data.code == 200) {
          //弹成功
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //24 刷新list
          this.reqList();
        }
      });
        },
        changeFile2(e){
            console.log(123);
            let file = e.raw;
            this.imgUrl=URL.createObjectURL(file)
            this.user.img=file
    },
    // 取消
    cancel(){
        this.info.isshow = false
    }
    ,
    getOne(id){
        reqcateDetail(id).then(res=>{
            this.user = res.data.list;
            this.imgUrl = this.$imgPre + this.user.img;
            this.user.id = id
        })
    },
    update() {
      reqcateUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.reqList();
        }
      });
    },


    },

}
</script>

<style scoped lang="stylus">
.add >>> .el-upload {
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