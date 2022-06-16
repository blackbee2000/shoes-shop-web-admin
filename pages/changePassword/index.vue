<template>
  <div class="change-pass-page">
    <div class="container" style="margin-bottom: 30px">
      <div class="row" style="margin-top: 20px">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-item">
            <label class="label">Mật khẩu cũ</label>
            <el-input
              type="password"
              v-model="oldPassword"
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
  layout: 'DefaultLayout',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  created() {},
  methods: {
    async save() {
      const _this = this
      const params = {
        oldPassword: _this.oldPassword,
        newPassword: _this.newPassword,
      }
      if (
        _this.oldPassword === '' ||
        _this.newPassword === '' ||
        _this.confirmPassword === ''
      ) {
        _this.$message({
          showClose: true,
          message: 'Vui lòng không để trống thông tin',
          type: 'error',
        })
      } else if (
        _this.oldPassword < 5 ||
        _this.newPassword < 5 ||
        _this.confirmPassword < 5
      ) {
        _this.$message({
          showClose: true,
          message: 'Vui lòng không để trống thông tin',
          type: 'error',
        })
      } else {
        await apiServices
          .changePassword(params)
          .then((res) => {
            if (res) {
              _this.$message({
                showClose: true,
                message: 'Đổi mật khẩu thành công',
                type: 'success',
              })
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