<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="banner">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="imgFile">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt />
            <input type="file" class="inp" v-if="info.isShow" @change="selectFile" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="banner.status" :active-value="1" inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add" v-if="info.title=='添加分类'">添加</el-button>
          <el-button type="primary" @click='updata' v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, successAlert } from "../../../utils/alelt";
import { mapActions, mapGetters } from "vuex";
import { reqbannerAdd, reqbannerDetail ,reqbannerUpdate} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      banner: {
        title: "",
        img: null,
        status: 1
      },
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList"
    }),
    //   清空banner
    empty() {
      this.banner = {
        title: "",
        img: null,
        status: 1
      };
       this.imgUrl = "";
    },
    // 弹框消失
    cancel() {
      this.info.isShow = false;
    },
    selectFile(e) {
      //   console.log(e);
      let file = e.target.files[0];

      // 判断图片大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("上传文件不能超过2M");
        return;
      }

      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的文件格式");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);

      this.banner.img = file;
    },
    add() {
      reqbannerAdd(this.banner).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty();
          this.cancel();
          this.reqList();
        }
      });
    },
    getOne(id) {
      console.log(id);
      reqbannerDetail(id).then(res => {
          this.banner = res.data.list
          this.imgUrl = this.$imgPre + this.banner.img
          this.banner.id = id
      });
    },
    updata(){
        reqbannerUpdate(this.banner).then(res=>{
            if(res.data.code==200){
                successAlert('修改成功')
                this.cancel()
                this.empty()
                this.reqList()
            }
        })
    },
    closed(){
        // 点击编辑后，对话框中获取到当前信息，点击取消后再点击添加，数据还存在
        if(this.info.title=='编辑分类'){
            this.empty()
        }
    }
  }
};
</script>

<style scoped>
.imgFile {
  width: 100px;
  height: 100px;
  border: 1px dashed skyblue;
  text-align: center;
  line-height: 100px;
  position: relative;
}
.imgFile h3 {
  font-size: 30px;
  font-weight: 100;
}
.imgFile img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.inp {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>