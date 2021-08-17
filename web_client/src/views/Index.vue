<template>
  <div class="IndexBox">
    <header-nav ></header-nav>
    <left-menu-nav></left-menu-nav>
    <div class="rightContent">
      <router-view ></router-view>
    </div>


  </div>


</template>

<script>
  import HeaderNav from "../components/HeaderNav";
  import LeftMenuNav from "../components/LeftMenuNav";
  export default {
    name: "Index",
    components:{
      HeaderNav,
      LeftMenuNav
    }
  }
</script>

<style scoped>
.IndexBox{
  width: 100vw;
  height:100vh;

}
  .rightContent{
    position: relative;
    width: calc(100vw - 180px);
    height: calc(100vh - 80px);
    left:180px;
  }
</style>