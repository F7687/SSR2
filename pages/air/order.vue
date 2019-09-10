<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" @setAllPrice='setAllPrice'/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
       <OrderAside :data="infoData"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data(){
      return{
          infoData:{
               insurances: [], // 初始化保险数据
                seat_infos: {}
          },
          allPrice:0
      }
  },
  mounted() {
    const { query } = this.$route;
    console.log(query);
    this.$axios({
      url: `airs/${query.id}`,
      params: { seat_xid: query.sid }
    })
      .then(res => {
        console.log(res);
        this.infoData=res.data
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
      setAllPrice(price){
          this.allPrice=price
      }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>