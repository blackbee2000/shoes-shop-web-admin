<template>
  <div class="user-admin-page">
    <!-- <div class="container" style="padding: 30px 0">
      <h2 v-if="$route.params.id === 'id'">Tạo mới bài viết</h2>
      <h2 v-else>Cập nhật bài viết</h2>
    </div> -->
    <div class="container" style="padding-bottom: 20px">
      <div class="row" style="justify-content: flex-end">
        <el-button icon="el-icon-error" @click="backPage()" class="back-button"
          >Quay lại</el-button
        >
        <el-button
          icon="el-icon-success"
          class="save-button"
          @click="handleSave()"
          >Lưu</el-button
        >
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Tiêu đề bài viết (tiếng việt)</label>
            <el-input
              type="text"
              v-model="formData.titleVi"
              placeholder="Nhập tiêu đề tiếng việt"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Tiêu đề bài viết (tiếng anh)</label>
            <el-input
              type="text"
              v-model="formData.titleEn"
              placeholder="Nhập tiêu đề tiếng anh"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Mô tả ngắn bài viết (tiếng việt)</label>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.descriptionShortVi"
              placeholder="Nhập mô tả ngắn bài viết (tiếng việt)"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Mô tả bài viết (tiếng anh)</label>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.descriptionShortEn"
              placeholder="Nhập mô tả ngắn bài viết (tiếng anh)"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px; text-align: center">
            <label class="label">Hình ảnh bài viết</label>
            <div style="width: 100%">
              <div class="wrapper">
                <div class="image">
                  <img id="img-upload" :src="formData.imageBlog" alt="" />
                </div>
                <div class="content">
                  <div class="icon">
                    <i class="el-icon-upload"></i>
                  </div>
                  <div class="text">Ảnh chưa được chọn!</div>
                </div>
                <div id="cancel-btn">
                  <i class="el-icon-close"></i>
                </div>
                <div class="file-name">Tên hình ở đây</div>
              </div>
              <input id="default-btn" type="file" hidden />
              <el-button
                @click="handleUploadImage()"
                style="margin-top: 20px"
                id="custom-btn"
                >Chọn hình ảnh</el-button
              >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Đường dẫn</label>
            <el-input
              type="text"
              v-model="formData.link"
              placeholder="Nhập đường dẫn"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Nội dung bài viết (tiếng việt)</label>
            <div>
              <vue-editor v-model="formData.contentVi"></vue-editor>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Nội dung bài viết (tiếng anh)</label>
            <div>
              <vue-editor v-model="formData.contentEn"></vue-editor>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-top: 20px">
      <div class="row" style="justify-content: flex-end">
        <el-button icon="el-icon-error" @click="backPage()" class="back-button"
          >Quay lại</el-button
        >
        <el-button
          icon="el-icon-success"
          class="save-button"
          @click="handleSave()"
          >Lưu</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import Blog from '@/model/blog'
import { apiServices } from '~/store/apiService'
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
      formData: new Blog(),
    }
  },
  async created() {
    const _this = this
    await _this.getData()
  },
  methods: {
    async getData() {
      const _this = this
      const blogId = localStorage.getItem('blogDetail')
      if (_this.$route?.params?.id === 'id') {
        _this.formData = new Blog()
      } else {
        await apiServices
          .getBlogById(blogId)
          .then((res) => {
            _this.formData = res?.data?.data
            console.log(_this.formData)
          })
          .catch((e) => {
            console.log('Lỗi')
          })
      }
    },
    backPage() {
      const _this = this
      const page = document.querySelector('.navbar .bottom h3')
      page.textContent = 'Quản lí bài viết'
      localStorage.removeItem('namePage')
      localStorage.setItem('namePage', 'Quản lí bài viết')
      localStorage.removeItem('menu')
      localStorage.setItem('menu', 'Bài viết')
      _this.$router.push('/blog')
    },
    async handleSave() {
      const _this = this
      console.log(_this.formData)
      if (_this.$route?.params?.id === 'id') {
        await apiServices
          .createBlog(_this.formData)
          .then((res) => {
            _this.$message({
              showClose: true,
              message: 'Thêm bài viết thành công',
              type: 'success',
            })
            setTimeout(() => {
              _this.$router.push('/blog')
            }, 1000)
            console.log(res)
          })
          .catch((e) => {
            _this.$message({
              showClose: true,
              message: 'Thêm bài viết thất bại',
              type: 'error',
            })
          })
      } else {
        await apiServices
          .updateBlog(_this.formData)
          .then((res) => {
            _this.$message({
              showClose: true,
              message: 'Cập nhật bài viết thành công',
              type: 'success',
            })
            setTimeout(() => {
              _this.$router.push('/blog')
            }, 1000)
            console.log(res)
          })
          .catch((e) => {
            _this.$message({
              showClose: true,
              message: 'Cập nhật bài viết thất bại',
              type: 'error',
            })
          })
      }
    },
    async uploadImage(image) {
      const _this = this
      const bodyFormData = new FormData()
      bodyFormData.append('Image', image)
      await apiServices
        .uploadImage(bodyFormData)
        .then((res) => {
          _this.formData.imageBlog = res?.data?.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleUploadImage() {
      const _this = this
      const defaulBtn = document.querySelector('#default-btn')
      const fileName = document.querySelector('.file-name')
      const img = document.querySelector('#img-upload')
      const cancelBtn = document.querySelector('#cancel-btn')
      defaulBtn.click()
      defaulBtn.addEventListener('change', function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = function () {
            const result = reader.result
            img.src = result
            _this.uploadImage(file)
            console.log(file)
          }
          cancelBtn.addEventListener('click', function () {
            img.src = ''
          })
          reader.readAsDataURL(file)
        }
        if (this.value) {
          const valueStore = this.value
          fileName.textContent = valueStore
        }
      })
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

.back-button {
  width: 100px;
  background-color: #f56c6c !important;
  border: none !important;
  outline: none !important;
  color: #fff;
}
.back-button:hover {
  color: #fff;
  background-color: #f64141 !important;
}

.save-button {
  width: 100px;
  background-color: #409eff;
  color: #fff;
}
.save-button:hover {
  width: 100px;
  background-color: #409eff;
  color: #fff;
}
.wrapper {
  width: 100%;
  height: 300px;
  border: 2px dashed #182444;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.wrapper .image {
  position: absolute;
  width: 100%;
  height: 100%;
}
.wrapper .image img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.wrapper .icon {
  font-size: 100px;
  color: #182444;
  text-align: center;
}
.wrapper .text {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
}
.wrapper #cancel-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transform: translateX(130%);
  transition: 0.5s;
}
.wrapper .file-name {
  position: absolute;
  bottom: 0;
  background: #182444;
  width: 100%;
  padding: 8px 0;
  font-size: 16px;
  text-align: center;
  color: #fff;
  transform: translateY(102%);
  transition: 0.5s;
}
.wrapper:hover .file-name {
  transform: translateY(0%);
  transition: 0.5s;
}
.wrapper:hover #cancel-btn {
  transform: translateX(0%);
  transition: 0.5s;
}
</style>
