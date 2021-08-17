<template>
  <div class="wrapper">
    <el-row class="LeftMenu">
      <el-col :span="12">

        <el-menu
                class="el-menu-vertical-demo"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff">

          <router-link to="/home">
            <el-menu-item index="0">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>


            <el-submenu v-if="item.children"  v-for="item in items" :index="item.path" :key="item.name">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
              <router-link v-for="(citem,cindex) in  item.children "
                           :key="cindex" :to="citem.path"
              >
                <el-menu-item :index="citem.path"><span slot="title">{{citem.name}}</span></el-menu-item>
              </router-link>
            </el-submenu>


        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "LeftMenuNav",
    data(){
      return {
        //处理具有多个子集的目录
        items:[
          {
            path:'fund',
            name:'资金管理',
            children:[
              {path: 'foundList',name:'资金流水'},
              {path:'child_1',name:'子集一'},
              {path:'child_2',name:'子集二'}

                ]
          },
          {
            path:'info',
            name:'信息管理',
            children:[
              {path: 'infoShow',name:'个人信息'},
              {path:'child_1',name:'子集一'},
              {path:'child_2',name:'子集二'}

            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .wrapper {

    position: absolute;
    width:180px;
    left: 8px;
    height:calc(100vh - 80px);
    background-color: #324057;
    z-index: 99;
  }
  .el-menu {
    border: none;
  }
  .fa-margin {
    margin-right: 5px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 350px;
  }
  .el-menu-vertical-demo {
    width: 35px;
  }
  .el-submenu .el-menu-item {
    min-width: 180px;
  }

  .hiddenDropdown,
  .hiddenDropname {
    display: none;
  }
  a {
    text-decoration: none;
  }
</style>