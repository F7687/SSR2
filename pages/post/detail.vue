<template>
  <div class="detail">
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding:15px 0">
        <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{content.title}}</h1>
      <div class="ready">
        <span>攻略： {{content.created_at}} 阅读：{{content.watch}}</span>
      </div>
    </div>

    <!-- 文章详情 -->
    <div class="content" v-html="content.content" id="content"></div>
    <!-- 文章详情 End-->

    <!-- 点赞评论 -->
    <el-row
      style="display:flex;padding:50px 0 30px;border:1px solid red;justify-content:center;width:700px;"
    >
      <div class="comment">
        <i class="el-icon-edit-outline"></i>
        <span>评论({{comments.length}})</span>
      </div>
      <div class="comment">
        <i class="el-icon-star-off"></i>
        <span>收藏</span>
      </div>
      <div class="comment">
        <!-- <i class="el-icon-share"></i> -->
        <svg class="icon" aria-hidden="true" style="padding-left:4px;font-size:40px;">
          <use xlink:href="#icon-fenxiang" />
        </svg>
        <span>分享</span>
      </div>
      <div class="comment">
        <i class="fa fa-thumbs-o-up"></i>
        <span>点赞()</span>
      </div>
    </el-row>
    <!-- 点赞评论 End-->

    <!-- 评论模块 -->
    <div class="detail_bottom">
      <el-form :model="docomments" status-icon ref="docomments" class="demo-ruleForm">
        <el-form-item>
          <p>评论</p>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="说点什么吧..."
            v-model="textarea"
            resize="none"
          ></el-input>
        </el-form-item>

        <!-- 文件上传 -->
        <div class="upload">
          <el-upload
            action="http://127.0.0.1:1337/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-error="errorUpload"
            name="files"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-button @click="setToken" type="success">测试</el-button> -->
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>

          <el-form-item style="text-align:end">
            <el-button type="primary" @click="submitForm('docomments')">提交</el-button>
            <el-button @click="resetForm('docomments')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 文件上传 -->

    <!-- 评论模块End -->
  </div>
</template>

<script>
// import icon from '@/assets/font_rag6czyto8p'
export default {
  data() {
    return {
      // url带过来的id
      id: 0,
      //   文章详细内容
      content: {},
      comments: [],
      docomments: {},
      textarea: "",
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: false,
      fileList:[]
    };
  },
  mounted() {
    // 获取url带过来的id并发送axios请求
    if (location.search) {
      console.log(true);
      this.id = location.search.slice(-1);
      console.log(this.id);
      let id = this.id;
      this.$axios({
        url: "posts",
        params: { id }
      })
        .then(res => {
          console.log(res);
          this.content = res.data.data[0];
          this.comments = this.content.comments;
          console.log(this.comments);
          console.log(this.content);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(false);
    }
  },
  methods: {
    // 测试
    // setToken(){

    //   let token=this.$store.state.user.userInfo.token
    //   console.log({ Authorization:`Bearer ${token}`});
    //   return { Authorization:`Bearer ${token}`}
    // },
    // 提交评论/重置
    submitForm() {},
    resetForm() {},
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(v){
      // console.log(v);
      // console.log(this.fileList);
      // return true;
    },
    errorUpload(v){
      console.log(v);
    }
  }
  //生命周期函数中js动态配置样式
  // updated() {
  //   console.log(this.id);
  //   //   获取html结构
  //   let obj = document.getElementById("content");
  //   //   console.log(obj);
  //   let imgs = obj.getElementsByTagName("img");
  //   //   console.log(imgs);
  //   for (var i = 0; i < imgs.length; i++) {
  //     // 给全部图片设置margin
  //     imgs[i].style.margin = "10px 0";
  //     console.log(imgs[i]);
  //     //   给大于700宽度的图片设置样式
  //     if (imgs[i].width > 700) {
  //       imgs[i].style.width = "100%";
  //       imgs[i].style.height = "100%";
  //     }
  //   }
  // }
};
</script>
<style lang="less" scoped>
.detail {
  margin: 0 auto;
  width: 1000px;
  //   height: 900px;
  border: 1px solid blueviolet;
}
.content {
  max-width: 700px !important;

  width: 700px;
  line-height: 1.5;
}
.content p {
  background-color: red;
}
.title {
  width: 700px;
  h1 {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .ready {
    text-align: right;
    padding: 20px;
    span {
      color: #777;
    }
  }
}
/deep/.content img {
  max-width: 100%;
}
.comment {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  font-size: 20px;
  cursor: pointer;
  text-align: center !important;
  /deep/i {
    font-size: 40px;
    color: #ffa500;
  }
  span {
    font-size: 14px;
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.detail_bottom {
  height: 700px;
  width: 700px;
  border: 1px solid #ccc;
}
.upload {
  display: flex;
  justify-content: space-between;
}
</style>