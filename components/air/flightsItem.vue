<template>
    <div class="flight-item">
        <div>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info" @click.native="isShow=!isShow">
                <!-- <button @click="test">测试</button> -->
                <el-col :span="6">
                    <span>{{data.airline_name}}</span> {{data.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.dep_time}}</strong>
                            <span>{{data.org_airport_name}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            
                            <span>{{getTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.arr_time}}</strong>
                            <span>{{data.dst_airport_name}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{data.seat_infos[0].settle_price/2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-show="isShow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell" v-for="(item,index) in data.seat_infos" :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.org_settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Moment, { min } from 'moment'
export default {
    data(){
        return{
            isShow:false
        }
    },
    props: {
        // 数据
        data: {
            type: Object,
            // 默认是空数组
            default: {}
        }
    },
    methods:{
        Expand(){
            // console.log(123);
            this.isShow=true
        }
    },
    computed:{
        getTime(){
             let arrTime=Math.round(new Date(this.data.arr_datetime));
             let depTime=Math.round(new Date(this.data.dep_datetime));
             if(arrTime<depTime){
                 arrTime=arrTime+24*60*60*1000;
             }
             let x=arrTime-depTime;
             let hour=Math.floor((x%(1000*60*60*24))/(1000*60*60))
             let minute=(x%(1000*60*60))/(1000*60)
             minute<10?'0'+minute:minute;
             hour<10?'0'+hour:'0'+hour
             return `${hour}时${minute}分`
        }
    },
    mounted(){
       
    }
 
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;
        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>