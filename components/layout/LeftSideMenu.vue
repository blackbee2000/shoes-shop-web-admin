<template>
  <div class="leftMenu">
    <div class="logo">
      <div class="logo-img">
        <img src="../../assets/images/logo.png" alt="logo" />
      </div>
    </div>
    <ul>
      <li @click="handleMenu('user')">
        <i class="el-icon-user-solid"></i>
        <p>Khách hàng</p>
      </li>
      <li @click="handleMenu('admin')">
        <i class="el-icon-s-custom"></i>
        <p>Quản trị viên</p>
      </li>
      <li @click="handleMenu('shoes')">
        <i class="el-icon-s-tools"></i>
        <p>Giày</p>
      </li>
      <li @click="handleMenu('blog')">
        <i class="el-icon-postcard"></i>
        <p>Bài viết</p>
      </li>
      <li @click="handleMenu('company')">
        <i class="el-icon-orange"></i>
        <p>Thương hiệu</p>
      </li>
      <li @click="handleMenu('voucher')">
        <i class="el-icon-s-ticket"></i>
        <p>Phiếu giảm giá</p>
      </li>
      <li @click="handleMenu('cart')">
        <i class="el-icon-shopping-cart-full"></i>
        <p>Đơn hàng</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    const leftMenu = document.querySelectorAll('.leftMenu ul li')
    const leftMenuContent = document.querySelectorAll('.leftMenu ul li p')
    const menu = localStorage.getItem('menu')
    for (let i = 0; i < leftMenuContent.length; i++) {
      if (leftMenuContent[i].textContent === menu) {
        console.log(menu)
        leftMenu[i].classList.add('active')
      }
    }
  },
  methods: {
    handleMenu(type) {
      const _this = this
      const leftMenu = document.querySelectorAll('.leftMenu ul li')
      for (let i = 0; i < leftMenu.length; i++) {
        leftMenu[i].addEventListener('click', function () {
          leftMenu.forEach(function (menuItem) {
            menuItem.classList.remove('active')
          })
          leftMenu[i].classList.add('active')
        })
      }
      const page = document.querySelector('.navbar .bottom h3')
      switch (type) {
        case 'user':
          _this.$router.push('/user')
          page.textContent = 'Quản lí khách hàng'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản lí khách hàng')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Khách hàng')
          break
        case 'admin':
          _this.$router.push('/admin')
          page.textContent = 'Quản lí quản trị viên'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản lí quản trị viên')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Quản trị viên')
          break
        case 'shoes':
          _this.$router.push('/shoes')
          page.textContent = 'Quản lí giày'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản lí giày')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Giày')
          break
        case 'blog':
          _this.$router.push('/blog')
          page.textContent = 'Quản lí bài viết'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản lí bài viết')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Bài viết')
          break
        case 'company':
          _this.$router.push('/company')
          page.textContent = 'Quản lí thương hiệu'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản lí thương hiệu')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Thương hiệu')
          break
        case 'voucher':
          _this.$router.push('/voucher')
          page.textContent = 'Quản lí phiếu giảm giá'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản phiếu giảm giá')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Phiếu giảm giá')
          break
        case 'cart':
          _this.$router.push('/cart')
          page.textContent = 'Quản lí đơn hàng'
          localStorage.removeItem('namePage')
          localStorage.setItem('namePage', 'Quản lí đơn hàng')
          localStorage.removeItem('menu')
          localStorage.setItem('menu', 'Đơn hàng')
          break
      }
    },
  },
}
</script>
<style scoped>
.leftMenu {
  height: 100vh;
  width: 150px;
  background-color: #181c32;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
.logo {
  padding: 0 40px;
  width: 100%;
  height: 140px;
  background-color: #1e1e2d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.logo-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
ul {
  widows: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  padding: 20px 0px;
}
ul li {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0px;
  cursor: pointer;
}
ul li i {
  font-size: 20px;
  color: white;
  padding-bottom: 10px;
  transition: 0.4s;
}
ul li p {
  margin: 0;
  padding: 0;
  opacity: 0.6;
  font-size: 15px;
  font-weight: 500;
  color: white;
  transition: 0.4s;
}
ul li.active i,
ul li:hover i {
  color: #009ef7;
  transition: 0.4s;
}
ul li.active p,
ul li:hover p {
  opacity: 1;
  transition: 0.4s;
}
</style>
