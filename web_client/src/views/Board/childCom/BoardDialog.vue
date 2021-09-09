<template>
  <div class="logFund">
    <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.isShow"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
      <div class="form">
        <el-form
                ref="form"
                :model="form_data"
                :rules="form_rules"
                label-width="120px"
                style="margin:10px;width:auto;">

          <el-form-item label="公司类型:" >
            <el-select v-model="form_data.type" placeholder="公司类型">
              <el-option
                      v-for="(formtype, index) in format_type_list"
                      :key="index"
                      :label="formtype" :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司名称:" prop="name">
            <el-input type="textarea" v-model="form_data.companyName"></el-input>
          </el-form-item>
          <el-form-item prop='describe' label="招、投标:">
            <el-input type="describe" v-model="form_data.describe"></el-input>
          </el-form-item>



          <el-form-item label="留言信息:">
            <el-input type="textarea" v-model="form_data.remark"></el-input>
          </el-form-item>

          <el-form-item  class="text_right">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "BoardDialog",
    props: {
      dialog: Object,
      form_data:{}

    },
    data() {
      return {

        format_type_list: [
          "国有独资公司",
          "个人独资企业",
          "有限合伙企业",
          "股份有限公司",
          "外商独资公司",
          "其他"
        ],
        form_rules: {
          describe: [
            { required: true, message: "招/投标选择项不能为空！", trigger: "blur" }
          ]


        }
      };
    },
    methods: {
      onCancel(){
        this.dialog.isShow = false
      },
      onSubmit(form) {
        this.$refs[form].validate(valid => {
          if (valid) {

            const option = this.dialog.option

            if(option === 'add'){

              this.$axios.post('/board/add',this.form_data).then(res =>{

                this.$message({
                  message:'发布留言成功',
                  type: 'success',
                  center: true
                })
              })
              //关闭弹窗
              this.dialog.isShow = false
              // //清除输入框内容
              // this.form_data = {}
              // 并且自定义事件到父组件刷新
              this.$emit('LoadRefresh')
            }
            else if(option === 'edit'){

              this.$axios.post(`/edit/${this.form_data.id}`,this.form_data).then(res =>{
                this.$message({
                  message:'修改成功',
                  type: 'success',
                  center: true
                })
              })
              //关闭弹窗
              this.dialog.isShow = false
              // //清除输入框内容
              // this.form_data = {}
              // 并且自定义事件到父组件刷新
              this.$emit('LoadRefresh')
            }




          }
        })
      }
    }
  };
</script>

