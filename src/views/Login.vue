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
        console.log(this.$store.state.token);
        this.$store.commit('updateToken',this.psw)
        console.log(this.$store.state.token);
        this.$router.push({path:'/home'})
      },
      reset(){
        console.log(this.$store.state.token);
        this.$store.commit('updateToken','')
        console.log(this.$store.state.token);
      }
    }
  }
</script>

<style scoped>

</style>