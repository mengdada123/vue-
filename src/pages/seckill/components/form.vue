<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="user.title" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="活动日期" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select placeholder="请选择一级分类" v-model="user.first_cateid" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid" @change="changeThirdid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
          <el-select placeholder="请选择商品" v-model="user.goodsid">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加活动'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqcateList,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
  reqseckDel,

} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alelt";
export default {
  props: ["info"],
  data() {
    return {
      pickerOptions: {},
      value1: [],
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      imgUrl: "",
      attrsList: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
      goodsList: "goods/list",
    }),
  },

  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqGoodsList: "goods/reqList",
      reqseckList: "seckill/reqList",
    }),
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeThirdid() {
      console.log(11);
      (this.user.goodsid = ""),
        this.reqGoodsList({
          fid: this.user.first_cateid,
          sid: this.user.second_cateid,
        });
    },
    changeFile(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    changeSpecsId() {
      this.user.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
      let obj = this.specsList.find((item) => item.id === this.user.specsid);
      this.attrsList = obj.attrs;
    },
    cancel() {
      this.info.isshow = false;
    },
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.secondCateList = [];
      this.imgUrl = "";
      this.attrsList = [];
      value1:[]
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          errorAlert("活动名称为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.user.begintime = this.value1[0];
      this.user.endtime = this.value1[1];
      reqseckAdd(this.user).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqseckDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        this.getSecondList();
      });
    },
    update() {
      reqseckUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.cancel();
          this.empty();
          this.reqseckList();
        }
      });
    },
    closed() {
      if (this.info.title == "编辑活动") {
        this.empty();
      }
    },
    opened() {
      this.editor = new E("#open");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
  },
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>