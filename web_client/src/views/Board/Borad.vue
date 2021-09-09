<template>
  <div id="Board">
    <h2>留言板</h2>
    <div class="form">
      <el-form class="filter" :model="filterData">
        <el-date-picker
                v-model="filterData.startTime"
                type="datetime"
                placeholder="选择开始时间"
                default-time="12:00:00">
        </el-date-picker>
        --
        <el-date-picker
                v-model="filterData.endTime"
                type="datetime"
                placeholder="选择结束时间"
                default-time="12:00:00">
        </el-date-picker>
        <el-button type="primary" class="filter_btn" size="small" @click="handleFilter">筛选</el-button>
        <el-button type="primary" class="filter_btn" size="small" @click="reSetFilter">重置</el-button>
      </el-form>

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" class="add_btn" size="small" @click="onAddMessage">发布留言</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <template>
        <el-table
                :data="tableData"
                style="width: 85%"
                max-height="450"
                border
        >

          <el-table-column
                  type="index"
                  label="序号"
                  width="75"
                  align="center">

          </el-table-column>
          <el-table-column
                  prop="date"
                  label="创建时间"
                  width="250"
                  align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="type"
                  label="公司类型"
                  width="135"
                  align="center">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="公司名称"
                  width="150"
                  align="center">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="describe"
                  label="招/投标"
                  width="200"
                  align="center">

            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.describe }}</span>
            </template>
          </el-table-column>


          <el-table-column
                  prop="remark"
                  label="留言信息"
                  width="325"
                  align="center">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.remark }}</span>
            </template>
          </el-table-column>

        </el-table>
        <!--        分页-->
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="pagination.current_page"
                      :page-sizes="pagination.page_sizes"
                      :page-size="pagination.page_size"
                      :layout="pagination.layout"
                      :total="pagination.total">
              </el-pagination>
            </div>

          </el-col>
        </el-row>
      </template>
    </div>
    <board-dialog :dialog="dialog" :form_data="form_data" @LoadRefresh="LoadRefresh"></board-dialog>
  </div>

</template>

<script>

  import BoardDialog from "./childCom/BoardDialog";

  export default {
    name: "Borad",
    components: {BoardDialog},
    data() {
      return {
        filterData: {
          startTime: '',
          endTime: ''
        },

        tableData: [],//一页的数据
        allTableData: [],//全部页一共有的数据
        form_data: {
          type: '',
          describe: '',
          remark: '',
          companyName:''
        },

        pagination: {
          current_page: 1,//当前的页数
          total: 0,//总共多少页
          page_size: 5,//默认每页显示多少条
          page_sizes: [5, 10, 15, 20],//选择每页显示多少条
          layout: "total, sizes, prev, pager, next, jumper"//组件布局
        },
        //增加留言信息
        dialog:{
          isShow:false,//默认编辑框隐藏
          title:'',//操作标题
          option:''//操作

        },
      }
    },
    created() {
      this.getMessages();

    },
    methods:{
      getMessages(){
        this.$axios.get("/board").then(res =>{

          this.allTableData = res.data
          console.log(this.allTableData)
          this.setPagination()
        })

      },
      setPagination(){

        //初始化Pagination的数据
        this.pagination.total = this.allTableData.length
        this.pagination.current_page = 1
        this.pagination.page_size = 5

        //设置默认的分页数据
        this.tableData = this.allTableData.filter( (item,index) => {
          return index < this.pagination.page_size
        })
      },
      LoadRefresh(){
        //再次调用，刷新页面
        this.getMessages()
      },
      handleSizeChange(page_size){
        this.pagination.page_size = page_size
        //设置分页数据
        this.tableData = this.allTableData.filter( (item,index) => {
          return index < this.pagination.page_size
        })

      },
      handleCurrentChange(page){
        this.pagination.current_page = page
        // 此页最小值在全部数据中的下标
        const index = this.pagination.page_size * (page-1)
        // //此页最大值在全部数据中的下标
        const nums = this.pagination.page_size * page
        //
        let tabDate = []
        for(let i = index;i< nums;i++ ){
          //判断下标是否越界
          if(this.allTableData[i]){
            tabDate.push(this.allTableData[i])
          }
          this.tableData = tabDate
        }

      },
      handleFilter(){
        //如果筛选的时间区域为空
        if(!this.filterData.startTime || !this.filterData.endTime){
          this.$message({
            message:'请选择筛选时间段',
            type:'warning'
          })
          this.getProfiles()
          return
        }

        const start = this.filterData.startTime.getTime()
        const end = this.filterData.endTime.getTime()

        this.allTableData = this.allTableData.filter(item =>{
          //格式化获取的时间
          const time = new Date(item.date).getTime()
          return time >= start && time<=end

        })
        //必须重新设置分页设置，否则无法显示筛选结果
        this.setPagination()


      },
      reSetFilter(){
        //重新获取数据
        this.getMessages()
        //清除筛选框内容
        this.filterData = {}
        //重新设置分页设置
        this.setPagination()
      },

      onAddMessage(){
        this.form_data = {}
        this.dialog.isShow = true
        this.dialog.title = "发布留言信息"
        this.dialog.option ="add"
      }

    }

  }
</script>

<style scoped>
  #Board{
    margin:10px;
  }
  .filter {
    margin-top: 20px;

    box-sizing: border-box;
  }

  .filter_btn {
    margin-left: 30px;
  }

  .demo-form-inline {
    float: right;
    height: 60px;

  }

  .add_btn {
    position: absolute;
    right: 200px;
    top: -45px;
  }

  .pagination {
    text-align: right;
    margin: 30px 100px ;
  }
</style>