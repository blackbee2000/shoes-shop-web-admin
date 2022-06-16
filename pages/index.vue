<template>
  <div>
    <div class="login">
      <div class="form">
        <div class="logo-login">LifeKicky</div>
        <el-form ref="form" :model="form" class="formLogin">
          <div class="logoUser">
            <img
              src="../assets/icons/icon-user-login.png"
              alt="logo-user-login"
            />
            <p>Have an account ?</p>
          </div>
          <el-form-item>
            <el-input
              v-model="form.phoneNumber"
              placeholder="Enter number phone"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="form.password"
              placeholder="Enter password"
            ></el-input>
          </el-form-item>
          <div class="remember-forget">
            <el-checkbox v-model="checked">Remember Me</el-checkbox>
            <p @click="handleResetPassword">Forgot Password</p>
          </div>
          <el-button :plain="true" @click="handleSubmit()" class="btn-login"
            >Login</el-button
          >
        </el-form>
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
      form: {
        phoneNumber: '',
        password: '',
      },
      checked: true,
      errorLogin: false,
      errorText: '',
    }
  },
  methods: {
    async handleSubmit() {
      const _this = this
      const regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/
      const phone = _this.form.phoneNumber.match(regExp)
      const params = _this.form

      if (_this.form.phoneNumber === '' || _this.form.password === '') {
        return
      } else if (phone) {
        return
      } else if (_this.form.password.length < 5) {
        return
      } else {
        await apiServices
          .login(params)
          .then(async (res) => {
            if (res) {
              if (res.data?.data?.role === 'USER') {
              }
              if (res.data?.data?.role === 'ADMIN') {
                await localStorage.setItem('token', res.data?.data?.token)
                await localStorage.setItem('namePage', 'Quản lí khách hàng')
                await localStorage.setItem('menu', 'Khách hàng')
                await this.$router.push('/user')
              }
            }
          })
          .catch((e) => {})
      }
    },
    async handleResetPassword() {
      const _this = this
      await _this.$router.push('/resetPassword')
    },
  },
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: #f0efef;
  z-index: 5000;
  position: fixed;
}
.form {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.logo-login {
  font-size: 50px;
  text-align: center;
  padding-bottom: 20px;
}
.formLogin {
  width: 500px;
  height: 380px;
  background: #fff;
  padding: 30px 50px;
  text-align: center;
  box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.32);
  -webkit-box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.32);
  border-radius: 10px;
}
.logoUser {
  width: 100%;
}
.logoUser img {
  width: 60px;
  height: 60px;
}
.logoUser p {
  margin-top: 15px;
  margin-bottom: 20px;
  color: #182444;
  font-size: 20px;
  font-weight: 600;
}
.remember-forget {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.remember-forget p {
  margin: 0;
  font-size: 16px;
  color: #182444;
  font-weight: 500;
  cursor: pointer;
}
.formLogin .btn-login {
  width: 80%;
  margin-top: 52px;
  background-color: #181c32;
  color: white;
}
.formLogin .btn-login:hover {
  background-color: #1e1e2d;
}
</style>
