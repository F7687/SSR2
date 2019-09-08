<template>
  <header class="header">
    <el-row type="flex" class="main" justify="space-between" interval="2000">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <el-row type="flex" class="navs">
        <div class="topmenu">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </div>
      </el-row>
      <el-row type="flex" class="middle">
        <div class="user" v-if="$store.state.user.userInfo.token">
          <i class="userico">
            <img
              :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
              alt
            />
          </i>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:-10px">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="userQuit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="login" v-else>
          <nuxt-link to="/user/login">登陆 ／ 注册</nuxt-link>

          <!-- <nuxt-link to="/">退出</nuxt-link> -->
        </div>
      </el-row>
    </el-row>
    <!-- <a>{{$store.state.user.userInfo.token}}</a> -->
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //清除本地存储
    userQuit(){
      // console.log('123')
      this.$store.commit('user/userQuit')

    }
  }
};
</script>
<style lang="less" scoped>
.middle {
  cursor: pointer;
}

.header {
  height: 60px;
  line-height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 0 #f5f5f5;

  .user {
    box-sizing: border-box;
    img {
      vertical-align: middle;
      border-radius: 50%;
      display: inline-block;
      width: 36px;
      height: 36px;
      border: 2px solid #fff;
        
      

    }
    &:hover img{
          border: 2px solid #76d6da;
        }
  }

  .main {
    width: 1000px;
    margin: 0 auto;
    height: 60px;

    .logo {
      padding-top: 9px;
      img {
        width: 156px;
        height: 42px;
      }
    }
    .navs {
      width: 634px;
      margin: 0 20px;
      font-size: 0;
      flex: 1;

      a {
        font-size: 18px;
        height: 60px;
        display: inline-block;
        padding: 0 18px;
        box-sizing: border-box;
        margin: 0;
        word-spacing: 0;
        &:hover {
          border-bottom: 5px #409eff solid;
          color: #409eff;
        }
      }

      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>