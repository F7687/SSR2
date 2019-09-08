<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <!-- <FlightsFlights :data="flightsItem" /> -->
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
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFlights from "@/components/air/flightsFlights.vue";
// import moment from "moment";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFlights
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
      total: 0
    };
  },
  methods: {
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