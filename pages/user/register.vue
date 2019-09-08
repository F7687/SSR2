<template>
  <div class="register">
    <el-form ref="form" :model="loginForm" :rules="rules" style="margin:30px">
      <el-form-item prop="username" style="padding-bottom:10px">
        <el-input placeholder="用户名/手机" clearable v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha" style="padding-bottom:10px">
        <el-input placeholder="验证码" clearable v-model="loginForm.captcha">
          <el-button slot="append" @click="getCode">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname" style="padding-bottom:10px">
        <el-input placeholder="你的名字" clearable v-model="loginForm.nickname"></el-input>
      </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="再次确认密码"></el-input>
        </el-form-item>
      <!-- <el-form-item prop="password" style="padding-bottom:10px">
        <el-input placeholder="密码" clearable v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" style="padding-bottom:10px">
        <el-input placeholder="确认密码" clearable v-model="loginForm.Endpassword" auto-complete="off"></el-input>
      </el-form-item> -->
      <el-button type="primary" plain style="width:100%" @click="register">注册</el-button>
      <!-- <el-button type="primary" plain  @click="test1">验证码测试</el-button> -->
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginForm.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      loginForm: {
        username: "",
        nickname: "",
        captcha: "",
        password:'',
        checkPass:''
      },
      rules: {
        username: [
          { required: true, message: "请输手机号码", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass:[
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login() {
      console.log(this.loginForm);
    },
    test() {
      // console.log(123);
      // console.log(this.loginForm.password);
      // console.log(this.loginForm.Endpassword);
      if (this.loginForm.password !== this.loginForm.Endpassword) {
        this.rules.Endpassword[1].validator = true;
        // this.rules.Endpassword[1].message='两次输入的密码不一致'
        this.tt = true;
        // console.log(this.rules.Endpassword[1].message);
      }
    },

    // 获取验证码
    async getCode(){
       let tel=this.loginForm.username
       let res=await this.$axios({
        url:'/captchas',
        method:'post',
        data:{tel},
        // headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }); 
      console.log(res);
      if(res.status===200){
        this.loginForm.captcha=res.data.code
      }
    },
    // 注册功能
     register(){
      let data=this.loginForm
      delete data.checkPass
      // console.log(data);
       this.$axios({
        // headers: {'Content-Type':'application/x-www-form-urlencoded'},
        url:'/accounts/register',
        method:'post',
        data,
      }).then((res)=>{
        if(res.data.token){
        this.$message.success('恭喜'+res.data.user.nickname+'注册成功~~~~')
        this.$router.push({name:'/login'})
        }
      })
      // console.log(res);
      
    }
  }
};
</script>
<style lang="less" scoped>
</style>