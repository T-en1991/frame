<template>
  <div class="home">
    <p>home</p>
    <!--<div v-for="item in menuList" :key="item.menuId">
      <el-divider></el-divider>
      <router-link :to="{path:item.path}">{{item.menuName}}</router-link>
    </div>-->
    <!--<About4c1></About4c1>-->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu key="1111" index="1111">
        <template slot="title">
          <i class="el-icon-location"></i>
          <router-link :to="{ path: '/about0/' }">菜单0</router-link>
        </template>
        <el-menu-item-group>
          <el-menu-item key="1111">
            <router-link :to="{ path: '/about0/about0c1' }"
              >菜单0-1</router-link
            >
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu
        v-for="item in menuList"
        :key="item.menuId"
        :index="item.menuId"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <router-link :to="{ path: item.path }">{{
            item.menuName
          }}</router-link>
        </template>
        <el-menu-item-group v-if="item.children.length">
          <el-menu-item
            v-for="children in item.children"
            :key="children.menuId"
          >
            <router-link :to="{ path: item.path + children.path }">{{
              children.menuName
            }}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// @ is an alias to /src
//import About4c1 from '../views/About4c1'
export default {
  name: "Home",
  data() {
    return {
      menuList: this.$store.state.menuList,
    };
  },
  components: {
    // About4c1
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped></style>
