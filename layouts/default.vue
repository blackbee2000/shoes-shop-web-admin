<template>
  <div id="wrapper">
    <NavBar />
    <LeftSideMenu />
    <div class="content-page">
      <div class="container-fluid paddingLeft">
        <nuxt />
      </div>
      <footer>@Made by <i>LifeKicky</i> 2022</footer>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar'
import LeftSideMenu from '@/components/layout/LeftSideMenu'
export default {
  name: 'DefaultLayout',
  components: {
    NavBar,
    LeftSideMenu,
  },
}
</script>
<style scoped>
.content-page {
  width: 100%;
  height: 100%;
  background-color: rgba(245, 248, 250, 0.8);
}
.content-page .paddingLeft {
  padding-left: 180px;
  padding-top: 20px;
}
footer{
  text-align: center;
  margin-left: 150px;
}
</style>
