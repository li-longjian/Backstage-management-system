<template>
  <div class="Home">
    <div class="content">
      <p >在线后台管理系统主页面</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<style scoped>
.Home{ background: url("../assets/img/showcase.png") no-repeat  ;
  width:100%;
  height:100%;

  background-size: cover;

}
  .content{
    width:100%;
    height:100%;

    background-color: rgba(0,0,0,.5);
  }
.content p{
  position: absolute;
  left:40%;
  top:10%;
  color:#fff;
  font-size:24px;
}
</style>