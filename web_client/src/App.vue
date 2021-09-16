<template>
  <div id="app">


    <router-link to="/index"></router-link>
    <router-view/>
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode"
  import isEmpty from "./utils/isEmpty";

  export default {
    name: "App",
    created() {
      this.getUserInfo()

    },
    methods:{
      getUserInfo(){
        /**
         * 如果是只在login时将解码出来的用户信息存储在store里面，当页面刷新后，store里面的数据会丢失，
         * 因此需要判断localStorage里面的token是否存在。如果存在这说明已经是登录状态了。并把用户信息重新解码存储一遍。
         */
        if (localStorage.eleToken) {
          const decoded = jwt_decode(localStorage.eleToken)
          //检查解码后的token是否为空,为空，授权状态为false,不为空，则授权为true
          const isAuthentication = !isEmpty(decoded)
          //更改store中的授权状态
          this.$store.commit('setAuthentication', isAuthentication)

          this.$store.commit('setUser', decoded)
        }
      },

    }
  }
</script>




<style>

*{ margin: 0;padding: 0}
#app{
  width: 100vw;
  height:100vh;

}
</style>
