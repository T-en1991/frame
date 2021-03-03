<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-input v-model="a"></el-input>
    <p>{{msga}}</p>
    <el-button @click="test">12</el-button>
    <p>{{sex}}</p>
    <p>{{age}}</p>
  </div>
</template>

<script>
  import msgmixin from '../mixins/msg'
  import {mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  mixins:[msgmixin],
  props: {
    msg: String
  },
  data(){
    return{
      a:'',
      aa:0,
      msga:'123'
    }
  },
  computed:mapState({
    sex:state=>state.person.sex,
    age:state=>state.person.age,
  }),
  mounted(){
    console.log( this.$store.getters.realToken) ;
  },
  methods:{
    test(){
      console.log('组件');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
