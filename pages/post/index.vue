<template>
  <div class="post">
    <el-row type="flex" class="main" justify="space-between" interval="2000">
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" v-model="form">
        <!-- --------------测试---------------- -->
        <!-- --------------推荐列表------------ -->
        <el-submenu :index="i+''" ref="form" v-for="(item,i) in form" :key="i">
          <!-- {{index}} -->
          <template slot="title" style="float:left">
            <ul>
              <li>{{item.type}}</li>
            </ul>
          </template>
          <el-menu-item-group class="test">
            <el-menu-item :index="j+''" v-for="(sencond,j) in item.children" :key="j" style>
              <a>{{sencond.city}}</a>
              <a>{{sencond.desc}}</a>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- --------------测试---------------- -->
      </el-menu>
      <el-row class="left">
        <!-- -------------搜索框---------------- -->
        <div class="searchBox">
          <input type="text" class="search" placeholder="请输入搜索内容" />
          <i class="el-icon-search iconSearch"></i>
        </div>
        <!-- -------------搜索框end---------------- -->

        <!-- --------------关键字----------------------- -->
        <div class="Keyword">
          <span>推荐：</span>
          <a href="#" >&nbsp;北京&nbsp;</a>
          <a href="javascript">&nbsp;上海&nbsp;</a>
          <a href="javascript">&nbsp;广州&nbsp;</a>
        </div>
        <!-- --------------关键字end----------------------- -->

        <!-- -------------------推荐攻略----------------------- -->
        <div class="suggest">
          <h3>推荐攻略</h3>
        </div>
        <!-- -------------------推荐攻略End----------------------- -->

        <!-- ------------------文章内容----------------- -->
        <div class="article" >
       <!-- <Recommend/> -->
        <ul>
            <li v-for="(item,index) in content" :key="index" :class="{imgMin3:item.images.length<3,imgMax3:item.images.length>=3}">
              <!-- {{item.images.length>=3?imgMax3:imgMin3}} -->
               <div class="imgs">
                <a href="#" v-for="(img,index) in item.images" :key="index">
                  <!-- <a href="" style="float:left">{{index}}</a> -->
                  <img :src="img" alt />
                </a>
              </div>
             <div class="titleAndContent">
                <h4>
                  <!-- <router-link to=""></router-link> -->
          <!-- <nuxt-link to="/post/detail"></nuxt-link> -->
          <a @click="test(item)">{{item.title}}</a>

                
              </h4>
              <p>
                <a href=":javascript">{{item.summary}}</a>
              </p>
             </div>
             
            </li>
          </ul>
          
        </div>
        <!-- ------------------文章内容End----------------- -->
      </el-row>
    </el-row>
    <!-- <LoginForm/> -->
    <!-- <detail/> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      isCollapse: true,
      form: [],
      content: [],
      id:'7687'
      // 判断3张以上的图片跟3张以下的图片的显示方式
      
        // imgMax3:true,
        // imgMin3:true
    
    };
  },
  methods: {
    // ----------测试------
    test(item) {
      console.log('7687');
      console.log(item.id);
      let id={id:item.id}
      this.$router.push({path:'/post/detail',query:id})
      // this.$axios({
      //   url:'posts',
      //   params:{id}
      // }).then((res)=>{
      //   console.log(res)

      // }).catch((err)=>{
      //   console.log(err)
      // })
      // console.log(this.form);
      // this.content=[]
      // this.$emit('id',this.id)
      // console.log('传递的☞');
    },
    //--------测试end----------
    async init() {
      let res = await this.$axios({ url: "/posts" });
      console.log(res);
      this.content = res.data.data;
      // console.log('*********************');
      // console.log(this.content);
      // console.log('*********************');
      // for(let i=0;i<this.content.length;i++){
      //   if(this.content[i].images.length>=3){
      //     console.log(this.content[i]);
      //     this.objClass.imgMax3=false;
      //     this.objClass.imgMin3=true;
      //   }
      // }
      // console.log(this.objClass);
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.form = res.data.data;
    });
    this.init();
  },

};
</script>

<style lang='less' scoped>
.left {
  width: 700px;
}
.post {
  padding-top: 20px;
  width: 1000px;
  margin: 0 auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  color: #fff;
  position: relative;
  left: 10px;
  width: 260px;
  height: 227px;
  border: 1px solid #ccc;
  li {

    border-bottom: 1px solid #ccc;
    &:nth-child(4) {
      border: none;
    }
  }
}
.searchBox {
  position: relative;
}
.el-input__inner,
.search {
  width: 700px;
  height: 40px;
  outline: none !important;
  box-sizing: border-box;
  line-height: 40px;
  padding-left: 20px;
  border-radius: 5px;
  // outline-color: #ffa500;
  border: 2px solid #ffa500;
}
input:focus {
  outline: none;
}
.iconSearch {
  position: absolute;
  right: 10px;
  top: 8px;
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: #ffa552;
  font-weight: 700px !important;
}
.Keyword {
  margin: 10px 0;
  color: #777;
  font-size: 14px;
  a {
    color: #777;
    text-align: center;
  }
  a:hover {
    color: #ffa552;
    text-decoration: underline;
  }
}
.suggest {
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
  h3 {
    display: inline-block;
    color: #ffa552;
    padding-bottom: 15px;
    border-bottom: 2px solid #ffa552;
    font-weight: normal;
  }
}
.article {
  border: 1px solid black;
  margin-top: 25px;
  ul {
    li {
      padding-bottom: 15px;
      h4 {
        padding: 15px 0;
      }
      p {
        height: 63px;
        overflow: hidden;
        a {
          color: #777;
        }
      }
      .imgs {
        // display: flex;
        height:150px;
        // overflow: hidden;
        a {
          display: inline-block;

          img {
            width: 220px;
            height: 150px;
          }
         
        }
         a:nth-child(2){
            padding: 0 0px;
          }
      }
    }
  }
}
.imgMax3{
  display:flex;
  flex-direction: column-reverse;
}
.imgMin3{
  display: flex;
  flex-direction: inherit;
}
// .test{
//   // position: absolute;

//   margin-left: -4px;
//   background-color: aquamarine
// }
// .el-menu--vertical{
// top:62px;
//   left:722px;
// }
</style>