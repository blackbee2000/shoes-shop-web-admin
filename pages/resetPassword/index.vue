<template>
  <div class="change-pass-page">
    <div class="container" style="margin-bottom: 30px">
      <div class="row" style="margin-top: 20px">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-item">
            <label class="label">Số điện thoại</label>
            <el-input
              type="password"
              v-model="phoneNumber"
              placeholder="Enter old password"
            ></el-input>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
      <div class="row" style="margin-top: 20px">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-item">
            <label class="label">Mật khẩu mới</label>
            <el-input
              type="password"
              v-model="newPassword"
              placeholder="Enter old password"
            ></el-input>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
      <div class="row" style="margin-top: 20px">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-item">
            <label class="label">Xác nhận mật khẩu</label>
            <el-input
              type="password"
              v-model="confirmPassword"
              placeholder="Enter old password"
            ></el-input>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
      <div class="row" style="margin-top: 20px">
        <div class="col-md-3"></div>
        <div class="col-md-6" style="text-align: right">
          <el-button icon="el-icon-success" class="save-button" @click="save"
            >Lưu</el-button
          >
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiServices } from '~/store/apiService'
export default {
  layout: 'blank',
  data() {
    return {
      phoneNumber: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  created() {},
  methods: {
    async save() {
      const _this = this
      const params = {
        phoneNumber: _this.phoneNumber,
        confirmPassword: _this.confirmPassword,
      }
      if (
        _this.phoneNumber === '' ||
        _this.newPassword === '' ||
        _this.confirmPassword === ''
      ) {
        _this.$message({
          showClose: true,
          message: 'Vui lòng không để trống thông tin',
          type: 'error',
        })
      } else if (_this.newPassword < 5 || _this.confirmPassword < 5) {
        _this.$message({
          showClose: true,
          message: 'Vui lòng không để trống thông tin',
          type: 'error',
        })
      } else {
        await apiServices
          .resetPassword(params)
          .then(async (res) => {
            if (res) {
              _this.$message({
                showClose: true,
                message: 'Cài lại mật khẩu thành công',
                type: 'success',
              })
              await _this.$router.push('/')
            }
          })
          .catch((e) => {
            _this.$message({
              showClose: true,
              message: 'Xảy ra lỗi, vui lòng kiểm tra lại',
              type: 'error',
            })
          })
      }
    },
  },
}
</script>

<style scoped>
.label {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
  margin-bottom: 10px;
}
.save-button {
  width: 100px;
  background-color: #409eff;
  color: #fff;
}
.save-button:hover {
  color: #fff;
}
</style>