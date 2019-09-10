<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFlights :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in newFlights" :key="index" :data="item" />
        </div>

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFlights from "@/components/air/flightsFlights.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
// import moment from "moment";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFlights,
    FlightsAside
  },
  data() {
    return {
      flightsItem: {
        flights: [],
        info: {},
        options: {}
      },
      newFlights: [],
      pageSize: 5,
      pageIndex: 1,
      total: 0,
      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      }
    };
  },
  methods: {
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;

        // 缓存一份新的列表数据数据，这个列表不会被修改
        // 而flightsData会被修改
        this.cacheFlightsData = { ...res.data };

        this.setDataList();
      });
    },

    // 设置dataList数据
    // arr是展示的新数据，该方法将会传递给过滤组件使用
    setDataList(arr) {
      console.log(arr);
      // 如果有新数据从第一页开始显示
      if (arr) {
        this.pageIndex = 1;
        this.flightsItem.flights = arr;
        this.flightsItem.total = arr.length;
        this.total=arr.length
      }
      console.log(this.newFlights);
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.newFlights = this.flightsItem.flights.slice(start, end);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // this.newFlights=this.flightsItem.flights.slice(this.pageSize*this.pageIndex-this.pageSize,this.pageSize*this.pageIndex)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      console.log(
        this.pageSize * this.pageIndex - this.pageSize,
        this.pageSize * this.pageIndex
      );
      this.newFlights = this.flightsItem.flights.slice(
        this.pageSize * this.pageIndex - this.pageSize,
        this.pageSize * this.pageIndex
      );
      console.log(this.newFlights);
    }
  },
  watch: {
        // watch可以监听this下的所有属性
        $route(){
            // 请求航班列表数据
            this.getData();
        }
    },
  mounted() {
    console.log(this.$route);
    this.$axios({
      url: "/airs",
      params: this.$route.query
    })
      .then(res => {
        console.log(res);
        this.flightsItem = res.data;
        this.total = this.flightsItem.flights.length;
        this.newFlights = this.flightsItem.flights.slice(
          this.pageSize * this.pageIndex - this.pageSize,
          this.pageSize * this.pageIndex
        );
        // console.log(this.newFlights);
      })
      .catch(err => {
        console.log(err);
      });
    //  this.$route.query=this.flightsItem
    //  console.log(this.fightsItem);
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>