
<!--投标信息弹窗-->

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


          <el-form-item label="投标日期:" prop="bidsTime">
            <el-date-picker
                    v-model="form_data.bidsTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop='LegalName' label="法人姓名">
            <el-input  v-model="form_data.LegalName"></el-input>
          </el-form-item>

          <el-form-item prop='phone' label="联系电话">
            <el-input  v-model="form_data.phone"></el-input>
          </el-form-item>

          <el-form-item prop='number' label="招标项目编号">
            <el-input  v-model="form_data.number"></el-input>
          </el-form-item>

          <el-form-item prop='productNumber' label="生产批号">
            <el-input  v-model="form_data.productNumber"></el-input>
          </el-form-item>

          <el-form-item label="投标单位" prop="companyName">
            <el-input  v-model="form_data.companyName"></el-input>
          </el-form-item>

          <el-form-item prop='bailTotal' label="投标总金额">
            <el-input  v-model="form_data.bailTotal"></el-input>
          </el-form-item>

          <el-form-item prop='productionDate' label="生产日期">
            <el-input  v-model="form_data.productionDate"></el-input>
          </el-form-item>

          <el-form-item prop='validPeriod' label="有效期">
            <el-input  v-model="form_data.validPeriod"></el-input>
          </el-form-item>

          <el-form-item prop='paymentDate' label="投标保证缴款日期">
            <el-input  v-model="form_data.paymentDate"></el-input>
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
    name: "BidDialog",
    props: {
      dialog: Object,
      form_data:{}

    },
    data() {
      return {

        user:this.$store.state.user,//获取当前账户登录信息

        form_rules: {
          LegalName: [
            { required: true, message: "法人姓名不能为空！", trigger: "blur" }
          ],
          phone: [
            { required: true, message: "联系电话不能为空！", trigger: "blur" }
          ],
          number: [
            { required: true, message: "招标项目编号不能为空！", trigger: "blur" }
          ],
          companyName: [
            { required: true, message: "投标单位不能为空！", trigger: "blur" }
          ],
          bailTotal: [
            { required: true, message: "投标总金额不能为空！", trigger: "blur" }
          ],
          paymentDate: [
            { required: true, message: "保证缴款日期不能为空！", trigger: "blur" }
          ],

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
            this.form_data.announcer = this.user.id;

            if(option === 'add'){

              this.$axios.post('/tender/addBids',this.form_data).then(res =>{

                this.$message({
                  message:'申请投标成功',
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


              this.$axios.post(`/bids/edit/${this.form_data.id}`,this.form_data).then(res =>{
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

