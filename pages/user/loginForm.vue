<template>
  <div class="loginForm">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" style="margin:30px">
      <el-form-item prop="username" style="padding-bottom:20px">
        <el-input placeholder="用户名/手机" clearable v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" style="padding-bottom:20px">
        <el-input placeholder="密码" clearable v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" plain style="width:100%" @click="login">登陆</el-button>
    </el-form>
  </div>
</template>
<script>
// import store from '@/components/store/user.js'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      // console.log();
      // console.log(this.$refs[v].validate);
      if(this.$refs.loginForm.validate((v)=>{
        if(v){
          let data=this.loginForm
      this.$axios({
        url:'/accounts/login',
        method:'post',
        data
      })
        .then((res)=>{
          // console.log(res)
          if(res.data.token){
            this.$message.success('登陆成功')
            // 设置状态管理
            this.$store.commit('user/setUserName',res.data)
            // this.$router.push({path:'/'})
          }
        })
        }else{    
          this.$message({
            message: '请输入正确的用户名密码',
            type: 'error'
          })
          return false
        }
      }));
      // console.log(this.$form);  
    }
  }
};
</script>
<style lang="less" scoped>

</style>