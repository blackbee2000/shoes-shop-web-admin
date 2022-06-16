<template>
  <div class="navbar">
    <div class="top">
      <div class="bottom">
        <h3>{{ namePage }}</h3>
      </div>
      <div class="profile">
        <el-dropdown>
          <div class="profile-left">
            <p>{{ name }}</p>
            <div class="profile-img">
              <img :src="avatar" alt="avt" />
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button class="actionIcon" @click="handleLogout()"
                ><i class="el-icon-error"></i> Đăng xuất</el-button
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button class="actionIcon" @click="changePassword()"
                ><i class="el-icon-s-tools"></i> Đổi mật khẩu</el-button
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button class="actionIcon" @click="updateProfile()"
                ><i class="el-icon-edit-outline"></i> Cập nhật hồ sơ</el-button
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { apiServices } from '~/store/apiService'
export default {
  data() {
    return {
      namePage: 'Home page',
      name: '',
      avatar: '',
    }
  },
  async created() {
    const _this = this
    _this.namePage = localStorage.getItem('namePage')
    await apiServices
      .getAccount()
      .then((response) => {
        if (response) {
          _this.name = response?.data?.data?.fullName
          _this.avatar = response?.data?.data?.avatar
          localStorage.setItem('userInfo', response?.data?.data)
          console.log(_this.avatar)
        }
      })
      .catch((err) => {})
  },
  methods: {
    async handleLogout() {
      const _this = this
      localStorage.clear()
      await _this.$router.push('/')
    },
    async changePassword() {
      const _this = this
      _this.namePage = 'Đổi mật khẩu'
      localStorage.removeItem('namePage')
      localStorage.removeItem('menu')
      await _this.$router.push('changePassword')
    },
    async updateProfile() {
      const _this = this
      _this.namePage = 'Cập nhật hồ sơ'
      localStorage.removeItem('namePage')
      localStorage.removeItem('menu')
      await _this.$router.push('editProfile')
    },
  },
}
</script>
<style scoped>
.navbar {
  width: 100%;
  /* padding: 20px 0px; */
  height: 100px;
  background: white;
  z-index: 10;
}
.top {
  width: 100%;
  padding: 0px 30px 15px 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top .profile .profile-left {
  display: flex;
  align-items: center;
}
.top .profile .profile-left p {
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: 500;
  padding-right: 15px;
  cursor: pointer;
}
.top .profile .profile-left .profile-img {
  width: 60px;
  height: 40px;
  border-radius: 5px;
  background-color: black;
  position: relative;
  overflow: hidden;
}
.top .profile .profile-left .profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  max-width: 100%;
  max-height: 100%;
}

.top .bottom h3 {
  font-size: 24px;
  color: black;
  padding-top: 15px;
  font-weight: 600;
}
.actionIcon {
  border: none !important;
  outline: none !important;
  background: transparent !important;
}
</style>
