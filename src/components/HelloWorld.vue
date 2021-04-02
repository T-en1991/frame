<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-input v-model="a"></el-input>
    <el-button @click="test">12</el-button>
  </div>
</template>

<script>
  import msgmixin from '../mixins/msg'
  export default {
  name: 'HelloWorld',
  mixins:[msgmixin],
  props: {
    msg: String
  },
  data(){
    return{
      a:''
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
