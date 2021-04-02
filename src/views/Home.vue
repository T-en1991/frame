<template>
  <div class="home">
    <p>home</p>
    <div v-for="(item) in arr" :key="item">
      <el-divider></el-divider>
      <router-link :to="{path:'/about'}">{{item}}</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>

<style scoped>

</style>
