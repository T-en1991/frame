export default {
  data(){
    return{
      msga:'mixin'
    }
  },
  mounted(){
    console.log('mounted:'+this.msga);
  },
  methods:{
    test(){
      console.log('methods:'+this.msga);
    }
  }
}