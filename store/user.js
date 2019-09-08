export const state=()=>{
    return{
     userInfo:{
         token:'',
         user:{}
     }
    }
 }
 export const mutations={
     setUserName(state,data){
         state.userInfo=data
     },
     //清除本地存储
     userQuit(state){
         state.userInfo={}
     }
 }
 export const actions={
     
 }