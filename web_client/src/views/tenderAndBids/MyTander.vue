<template>
  <div>
    <rl-row :gutter="20">
      <h2>我的招标信息</h2>

        <el-button type="success" class="add_btn" size="medium" @click="onAddMessage">发布招标信息</el-button>



    </rl-row>


    <el-row :gutter="20" class="content">

     <el-col :span="12"  v-for="(item,index) in tableData" :key="index">
        <div class="grid-content bg-purple">
          <el-descriptions title="招标信息" column="2" border>
            <el-descriptions-item label="时间">{{item.date}}</el-descriptions-item>
            <el-descriptions-item label="项目编号">{{item.number}}</el-descriptions-item>
            <el-descriptions-item label="公司名称">{{item.companyName}}</el-descriptions-item>
            <el-descriptions-item label="药品名称">{{item.drugName}}</el-descriptions-item>
            <el-descriptions-item label="制药单位">{{item.companyName}}</el-descriptions-item>
            <el-descriptions-item label="包装要求">{{item.Package}}</el-descriptions-item>
            <el-descriptions-item label="截止日期">{{item.expirationDate}}</el-descriptions-item>
            <el-descriptions-item label="状态">

              <el-tag size="small">待投标</el-tag>

            </el-descriptions-item>
            <el-descriptions-item label="操作一">
              <el-button
                      type="warning"
                      size="mini"
                      @click="handleEdit(index,item)">
                编辑
              </el-button>
            </el-descriptions-item>
            <el-descriptions-item label="操作二">
              <el-popconfirm
                      title="确定删除吗？"
                      icon="el-icon-info"

                      @confirm="handleDelete(index,item)"
              >
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popconfirm>
            </el-descriptions-item>

          </el-descriptions>
        </div>
      </el-col>

    </el-row>

    <tander-dialog
                   :dialog="dialog" :form_data="form_data"
                   @LoadRefresh="LoadRefresh"></tander-dialog>
  </div>
</template>

<script>
  import TanderDialog from "./childCom/TanderDialog";
  export default {
    name: "MyTander",
    components:{TanderDialog},
    data(){
      return{
        user :this.$store.state.user,
        tableData:[],
        //增加留言信息
        dialog:{
          isShow:false,//默认编辑框隐藏
          title:'',//操作标题
          option:''//操作

        },
        form_data: {
          number: '',
          drugName: '',
          companyName: '',
          Package:'',
          Total:'',
          expirationDate:'',
          bail:'',
          announcer:'',
          id:''

        },

      }
    },
    created() {
      this.getTender()
    },
    methods:{
      /**
       * 根据用户id查找用户发表的招标信息
       */
      getTender(){
        this.$axios.get(`/tender/${this.user.id}`).then(res =>{
          this.tableData = res.data
          console.log(this.tableData);
        }).catch(err =>{
          console.log(err);
        })
      },

      LoadRefresh(){
        this.getTender()
      },
      onAddMessage(){
        this.form_data = {}
        this.dialog.isShow = true
        this.dialog.title = "发布招标信息"
        this.dialog.option ="add"
      },
      handleEdit(index,item){
        this.form_data = item
        this.form_data.id = item._id

        this.dialog.isShow = true
        this.dialog.title = '编辑招标信息'
        this.dialog.option = 'edit'
      },

      handleDelete(index,item){
        this.$axios.get(`/tender/delete/${item._id}`).then(res =>{
          this.$message({
            message:'删除成功',
            type: 'success',
            center: true
          })
          //重新刷新
          this.getTender()
        })
      }



    }

  }
</script>

<style scoped>
.content{
  margin-top: 20px;
}
  .add_btn{
    margin-top:20px;
    margin-left: 10px;
  }

</style>