<template>
    <div style="margin:50px auto;width:50%;">
        <div>账号：<el-input v-model="id" type="text"></el-input></div>

        <div>密码：<el-input v-model="psw" type="password"></el-input></div>

        <el-button @click="btn">提交</el-button>
        <el-button @click="reset">重置</el-button>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        id:'',
        psw:''
      }
    },
    methods:{
      btn(){
        this.$store.commit('user/updateToken',this.psw)
   /*     let menuList=[
          {
            menuId:'1',
            menuName:'菜单1',
            path:'/about1',
            meta:{
              requireAuth:true
            },
            parentMenuId:'',
            children:[],
            redirect:''
          },
          {
            menuId:'2',
            menuName:'菜单2',
            path:'/about2',
            meta:{
              requireAuth:true
            },
            parentMenuId:'',
            children:[],
            redirect:''
          },
          {
            menuId:'4',
            menuName:'菜单4',
            path:'/about4',
            meta:{
              requireAuth:true
            },
            parentMenuId:'',
            children:[],
            redirect:''
          },
          {
            menuId:'6',
            menuName:'菜单6',
            path:'/about6',
            meta:{
              requireAuth:true
            },
            parentMenuId:'',
            children:[],
            redirect:''
          }
        ]*/
  /*      menuList.forEach(cv=>{
          cv.path
        })*/

        this.$router.push({path:'/home'})
      },
      reset(){
        this.$store.commit('setToken','')
      }
    }
  }
</script>

<style scoped>

</style>